import { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  function handleOnStepChange(event) {
    setStep(Number(event.target.value));
  }
  function handleOnCountChange(event) {
    setCount(Number(event.target.value));
  }
  function handleOnClick(event) {
    setStep(1);
    setCount(0);
  }

  return (
    <>
      <div>
        <input
          type="range"
          min={1}
          max={1000}
          value={step}
          onChange={handleOnStepChange}
        />

        {/* <button onClick={() => setStep(s => s - 1)}>-</button> */}
        <span>Step: {step}</span>
        {/* <button onClick={() => setStep(s => s + 1)}>+</button> */}
      </div>
      <div>
        <button onClick={() => setCount(c => c - step)}>-</button>
        <input type="text" value={count} onChange={handleOnCountChange}></input>
        <span>Count: {count}</span>
        <button onClick={() => setCount(c => c + step)}>+</button>
      </div>
      <div>
        <span>
          {count === 0
            ? 'Todays is '
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
          {`${date.toDateString()}`}
        </span>
      </div>
      {step !== 1 || count !== 0 ? (
        <div>
          <button onClick={handleOnClick}>Reset</button>
        </div>
      ) : null}
    </>
  );
}

export default App;
