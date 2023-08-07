export default function Startscrean({numquestions,dispatcher}) {
    return <div className="start">
        <h2>Welcome to the react quiz!</h2>
        <h3>{ numquestions} questions to test your react mastery</h3>
        <button className="btn btn-ui" onClick={()=>dispatcher({type:"start"})}>let's start</button>
    </div>
}