export default function Nextbutton({answer,dispatcher,index,numQuestions}) {
    if (answer === null) return;
    
    if (index < numQuestions - 1)
    return <button className="btn btn-ui"
        onClick={() =>
            dispatcher({ type: "nextQuestion" })}>
        NEXT
    </button>
    if (index === numQuestions - 1)
    return <button className="btn btn-ui"
    onClick={() =>
        dispatcher({ type: "finish" })}>
    FINISH
    </button>
}