import { useReducer } from "react";
const initalstate={ count:0,step:1}
function reducer(state, action) {
  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'setcount':
      return { ...state, count: action.payload };
    case 'setstep':
      return { ...state, step: action.payload };
    case 'reset':
    
      return  initalstate ;
    
    default:
      throw new Error("unknown error");
    }
}
export function DateCounter() {
  const [State, dispatch] = useReducer(reducer, initalstate);
  const { count, step } = State;
  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);
  console.log(date)
  

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={(e)=>dispatch({ payload: Number(e.target.value), type: "setstep" })}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={()=> dispatch({ type: "dec"})}>-</button>
        <input value={count} onChange={(e)=>dispatch({ payload :Number(e.target.value), type:"setcount"})} />
        <button onClick={()=> dispatch({ type: "inc"})}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={()=> dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
