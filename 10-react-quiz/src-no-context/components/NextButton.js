function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return;

  console.log('index , numQuestions', index, numQuestions);
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'finishQuiz' })}
      >
        Finish
      </button>
    );
}

export default NextButton;
