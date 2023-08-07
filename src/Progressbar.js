export default function Progressbar({index,answer,numquestions,points,possiblepoints}) {
    return <header className="progress">
        <progress max={numquestions } value={index+Number(answer!==null)} />
        <p>Questions <span>{index + 1}</span>/{numquestions}</p>
        <p>
            <strong>{points }</strong>/{possiblepoints}
        </p>
    </header>
        
    
}