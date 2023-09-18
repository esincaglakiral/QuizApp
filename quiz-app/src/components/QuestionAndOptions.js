import React from "react";

const QuestionAndOptions = ({
  question,
  selectedOption,
  handleOptionChange,
  canAnswer,
}) => {
  const options = ["A", "B", "C", "D"];

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>{question.questionText}</h2>
      <ul>
        {options.map((option, index) => (
          <div key={option}>
            <label>
              <input
                type="radio"
                name="options"
                value={option}
                onChange={() => canAnswer && handleOptionChange(option)}
                checked={selectedOption === option}
                disabled={!canAnswer}
              />
              {question.options[option]} {/* Şık içeriği */}
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default QuestionAndOptions;
