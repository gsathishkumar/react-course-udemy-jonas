import { useReducer } from 'react';

const initialState = { step: 1, count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action');
  }
}

export default function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const date = new Date();
  date.setDate(date.getDate() + state.count);

  function handleOnStepChange(event) {
    dispatch({
      type: 'setStep',
      payload: Number(event.target.value),
    });
  }
  function handleOnCountChange(event) {
    dispatch({
      type: 'setCount',
      payload: Number(event.target.value),
    });
  }
  function handleOnClick(event) {
    dispatch({
      type: 'reset',
    });
  }

  return (
    <>
      <div>
        <input
          type="range"
          min={1}
          max={1000}
          value={state.step}
          onChange={handleOnStepChange}
        />

        {/* <button onClick={() => setStep(s => s - 1)}>-</button> */}
        <span>Step: {state.step}</span>
        {/* <button onClick={() => setStep(s => s + 1)}>+</button> */}
      </div>
      <div>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <input
          type="text"
          value={state.count}
          onChange={handleOnCountChange}
        ></input>
        <span>Count: {state.count}</span>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      </div>
      <div>
        <span>
          {state.count === 0
            ? 'Todays is '
            : state.count > 0
            ? `${state.count} days from today is `
            : `${Math.abs(state.count)} days ago was `}
          {`${date.toDateString()}`}
        </span>
      </div>
      {state.step !== 1 || state.count !== 0 ? (
        <div>
          <button onClick={handleOnClick}>Reset</button>
        </div>
      ) : null}
    </>
  );
}
