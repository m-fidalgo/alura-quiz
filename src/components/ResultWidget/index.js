/* eslint-disable react/prop-types */
import React from "react";
import Widget from "../Widget";

export default function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>Tela de Resultados</Widget.Header>
      <Widget.Content>
        <p>{`Você acertou ${results.filter((x) => x).length} perguntas`}</p>
        <ul>
          {results.map((result, index) => (
            <li>
              {`Resultado #${index + 1}: ${result ? "Acertou" : "Errou"}`}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}
