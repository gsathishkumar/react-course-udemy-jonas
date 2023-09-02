import { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const secs = Math.floor(secondsRemaining % 60);

  useEffect(
    function () {
      const timerId = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);

      return () => clearInterval(timerId);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 && '0'}
      {mins}:{secs < 10 && '0'}
      {secs}
    </div>
  );
}

export default Timer;
