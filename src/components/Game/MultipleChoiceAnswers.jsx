const AnswerFields = (answers, fieldsDisabled, handleAnswer) => {
  for (const index of answers.keys()){
    return (
      <div className="col-2 flex-fill">
        <button
          disabled={fieldsDisabled}
          className="quiz-button w-100"
          onClick={() => handleAnswer(index)}
          variant="primary"
        >
          {answers[index]}
        </button>
      </div>
    );
  }
  };

  export default AnswerFields;