/* eslint-disable react/prop-types */
import React from "react";
import Widget from "../Widget";
import Button from "../Button";

export default function QuestionWidget({
  question,
  totalQuestions,
  currentQuestion,
  onSubmit,
}) {
  const questionId = `question_${currentQuestion}`;

  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${currentQuestion + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
        src={question.image}
      />
      <Widget.Content>
        <p>{question.title}</p>
        <p>{question.description}</p>
        <form onSubmit={onSubmit}>
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId}>
                <input
                  id={alternativeId}
                  type="radio"
                  name={questionId}
                  style={{ display: "none" }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit">Confirmar</Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}
