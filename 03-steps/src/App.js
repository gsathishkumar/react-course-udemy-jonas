import React, { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

function Footer({ prevHandler, nextHandler }) {
  const [count, setCount] = useState(1);
  return (
    <footer>
      <div>
        <p>&copy; 2023 Footer Component {count}</p>
        <button
          onClick={() => {
            setCount(count - 1);
            prevHandler();
          }}
        >
          Decrement
        </button>

        <button
          onClick={() => {
            setCount(count + 1);
            nextHandler();
          }}
        >
          Increment
        </button>
      </div>
    </footer>
  );
}

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) {
      setStep(s => s - 1);
    }
    console.log('handlePrevious', step);
  }

  function handleNext() {
    if (step < 3) {
      setStep(s => s + 1);
    }
    console.log('handleNext', step);
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen(open => !open)}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>
          <p className="message">{messages[step - 1]}</p>

          <div className="buttons">
            <button
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
      <Footer prevHandler={handlePrevious} nextHandler={handleNext} />
      <Footer prevHandler={handlePrevious} nextHandler={handleNext} />
      <Footer prevHandler={handlePrevious} nextHandler={handleNext} />
    </>
  );
}

export default App;
