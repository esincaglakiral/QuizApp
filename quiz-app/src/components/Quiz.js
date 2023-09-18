import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../api/quizApi";
import QuestionAndOptions from "./QuestionAndOptions";
import Result from "./Result";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canAnswer, setCanAnswer] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [answers, setAnswers] = useState([]);

  const fetchQuizData = async () => {
    const fetchedQuestions = await fetchQuestions();
    setQuestions(fetchedQuestions.map((q) => ({ ...q, correctAnswer: "A" })));
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (timeLeft === 20) {
      setCanAnswer(true); // 20 saniyeden sonra cevap verilebilir
    }
    if (timeLeft === 0) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Zaman doldu, bir sonraki soru
        setCanAnswer(false); // Yeni soru geldiğinde cevap verme izni sıfırlanır
        setTimeLeft(30); // Yeni soru geldiğinde zaman sıfırlanır
      } else {
        setIsTestFinished(true); // Tüm sorular cevaplandı, testi bitir
      }
    }
  }, [timeLeft, currentQuestionIndex, questions]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOptionChange = (option) => {
    if (canAnswer) {
      const currentQuestion = questions[currentQuestionIndex];
      setSelectedOption(option);

      if (option === currentQuestion.correctAnswer) {
        setCorrectAnswers(correctAnswers + 1);
        setAnswers((prevAnswers) => [
          ...prevAnswers,
          {
            question: currentQuestion.questionText,
            choice: option,
            isCorrect: true,
          },
        ]);
      } else {
        setIncorrectAnswers(incorrectAnswers + 1);
        setAnswers((prevAnswers) => [
          ...prevAnswers,
          {
            question: currentQuestion.questionText,
            choice: option,
            isCorrect: false,
          },
        ]);
      }
    } else {
      setSelectedOption(null); // Eğer cevap verme izni yoksa seçimi temizle
    }
  };

  useEffect(() => {
    setSelectedOption(null); // Her yeni soruya geçildiğinde seçenekleri sıfırla
  }, [currentQuestionIndex]); // currentQuestionIndex değiştiğinde bu etkileşim çalışacak

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1 && timeLeft === 30) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Sonraki soruya geçerken seçimi temizle
      setCanAnswer(false);
      setTimeLeft(30);
    } else if (
      currentQuestionIndex === questions.length - 1 &&
      timeLeft === 30
    ) {
      setIsTestFinished(true);
      setCanAnswer(false);
    }
  };
  return (
    <div className="container">
      <div className="quiz-container">
        {questions.length > 0 &&
        currentQuestionIndex < questions.length &&
        !isTestFinished ? (
          <div className="question-container">
            <div className="timer">Zaman: {timeLeft} saniye</div>
            <QuestionAndOptions
              question={questions[currentQuestionIndex]}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              canAnswer={canAnswer}
            />
            <button
              className="question-number"
              onClick={handleNextQuestion}
              disabled={!canAnswer || timeLeft !== 30}
            >
              Soru: {currentQuestionIndex + 1}/{questions.length}
            </button>
          </div>
        ) : (
          <div className="result-container">
            {isTestFinished ? (
              <Result
                correctAnswers={correctAnswers}
                incorrectAnswers={incorrectAnswers}
                totalQuestions={questions.length}
                answers={answers}
              />
            ) : (
              <p>Soru yok veya test tamamlandı.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
