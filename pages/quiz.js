import React, { useState, useEffect } from "react";
import db from "../db.json";
import QuizLogo from "../src/components/QuizLogo";
import QuizBgd from "../src/components/QuizBgd";
import QuizContainer from "../src/components/QuizContainer";
import QuestionWidget from "../src/components/QuestionWidget";
import LoadingWidget from "../src/components/LoadingWidget";
import ResultWidget from "../src/components/ResultWidget";

const screenStates = {
  LOADING: "LOADING",
  QUIZ: "QUIZ",
  RESULT: "RESULT",
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = db.questions[currentQuestion];
  const total = db.questions.length;

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  function addResult(result) {
    setResults([...results, result]);
  }

  function handleSubmit() {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < total) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBgd backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={total}
            currentQuestion={currentQuestion}
            onSubmit={() => handleSubmit()}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBgd>
  );
}
