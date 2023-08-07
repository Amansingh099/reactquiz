import Option from "./Option";

export default function Question({ Question ,dispatcher,answer }) {
    console.log(Question)
    return <div>
        <h4>{Question.question}</h4>
        <Option Question={Question} dispatcher={dispatcher} answer={answer}/>
    </div>;
}   