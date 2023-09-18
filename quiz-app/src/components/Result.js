import React from "react";

const Result = ({
  correctAnswers,
  incorrectAnswers,
  totalQuestions,
  answers,
}) => {
  const successPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(
    2
  );

  return (
    <div className="result-card">
      <h2>Test Sonucu</h2>
      <p>Doğru Cevaplanan Sorular: {correctAnswers}</p>
      <p>Yanlış Cevaplanan Sorular: {incorrectAnswers}</p>
      <p>Yüzdelik Başarı: {successPercentage}%</p>

      <h3>Her Soruya Verilen Cevaplar</h3>
      <table>
        <thead>
          <tr>
            <th>Soru</th> 
            <th>Cevap</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer, index) => (
            <tr key={index}>
              <td>{answer.question}</td>
              <td>{answer.choice}</td>
              <td>
                {answer.isCorrect ? (
                  <span style={{ color: "green" }}>✔</span>
                ) : (
                  <span style={{ color: "red" }}>✕</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
