/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Widget from "../Widget";
import Button from "../Button";
import AlternativesForm from "../AlternativesForm";
import BackLinkArrow from "../BackLinkArrow";

export default function QuestionWidget({
  question,
  totalQuestions,
  currentQuestion,
  onSubmit,
  addResult,
}) {
  const questionId = `question_${currentQuestion}`;
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const hasAlternativeBeenSelected = selectedAlternative !== undefined;
  const isCorrect = selectedAlternative === question.answer;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href='/' />
        <h3>{`Pergunta ${currentQuestion + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt='Descrição'
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
        src={question.img}
      />

      <Widget.Content>
        <p>{question.title}</p>
        <p>{question.description}</p>
        <AlternativesForm
          onSubmit={(e) => {
            e.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit(e);
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const isSelected = selectedAlternative === alternativeIndex;
            const alternativeStatus = isCorrect ? "SUCCESS" : "ERROR";

            return (
              <Widget.Topic
                key={alternativeId}
                as='label'
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  id={alternativeId}
                  type='radio'
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  style={{ display: "none" }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type='submit' disabled={!hasAlternativeBeenSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect && <p>Acertou</p>}
          {isQuestionSubmited && !isCorrect && <p>Errou</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}
