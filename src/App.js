import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import Startscrean from "./Startscrean"
import Question from "./Questions"
import Nextbutton from "./Nextbutton"
import Progressbar from "./Progressbar"
import FinishScreen from "./FinishScreen"
import Timer from "./Timer"
const secs = 30;
const initialstate = { Questions: [], status: "loading", index: 0, answer:null ,points:0, highscore:0,secondsRemaining:0};
function reducer(state, action) {
    switch (action.type) {
        case ("datarecived"):
            return ({ ...state, Questions: action.payload ,status: "ready" });
        case ("datafailed"):
            return { ...state, status: "error" };
        case ("start"):
            return { ...state, status: "active" ,secondsRemaining:state.Questions.length*secs};
        case ("activeanswer"):
            const question = state.Questions[state.index];
            return {
                ...state, answer: action.payload
                ,points: action.payload===question.correctOption?state.points+question.points:state.points
            }
        case ("nextQuestion"):
            return { ...state, index: state.index + 1, answer: null };
        case "finish":
                return {
                  ...state,
                  status: "finished",
                  highscore:
                    state.points > state.highscore ? state.points : state.highscore,
            };
        case ("restart"):
            return { ...initialstate, Questions: state.Questions, status: "ready" };
        case "tick":
                return {
                  ...state,
                  secondsRemaining: state.secondsRemaining - 1,
                  status: state.secondsRemaining === 0 ? "finished" : state.status,
                };
        
        default :
         throw new Error("unknown error");
    }
}
export default function App() {
    const [{ Questions, status, index, answer,points,highscore,secondsRemaining }, dispatcher] = useReducer(reducer, initialstate);
    useEffect(function () {
        fetch("http://localhost:3030/Questions")
            .then(res => res.json())
            .then(data => dispatcher({ type: "datarecived", payload: data }))
            .catch(err => dispatcher({type:"datafailed"}));
        
    }, [])
    const possiblepoints = Questions.reduce((prev, cur) => prev + cur.points, 0);
    const numquestions = Questions.length;
    
    return <div className="app">
        <Header />
        <Main>
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && <Startscrean numquestions={numquestions} dispatcher={dispatcher } />}
            {status === "active" && <>
                <Progressbar index={index} answer={answer} numquestions={numquestions}
                    points={points} possiblepoints={possiblepoints} />
                <Question Question={Questions[index]} dispatcher={dispatcher} answer={answer} />
                <Nextbutton dispatcher={dispatcher} answer={answer} numQuestions={numquestions} index={index} />
                <Timer dispatch={dispatcher} secondsRemaining={secondsRemaining}/>
            </>}
                {status === "finished" && <FinishScreen highscore={highscore} maxPossiblePoints={possiblepoints}
                    points={points} dispatch={dispatcher} />}
        </Main>
    </div>
}