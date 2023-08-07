export default function Option({ Question, dispatcher,answer }) {
    const hasanswered = answer !== null;
    console.log(Question.options)
    return <div className="options">

        {Question.options.map((option,index) =>
            <button className={` btn btn-option ${hasanswered? index===Question.correctOption?"correct":"wrong"
            :"" } ${index===answer?"answer":""}`} key="option" onClick={() =>
                dispatcher({ type: "activeanswer", payload: index })}
            disabled={hasanswered}>
                {option}
            </button>)}
    </div>
}