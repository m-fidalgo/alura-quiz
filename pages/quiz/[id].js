/* eslint-disable react/prop-types */
import React from "react";
import { ThemeProvider } from "styled-components";
import QuizScreen from "../../src/screens/Quiz";

export default function QuizDaGaleraPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen db={externalDb} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, userName] = context.query.id.split("___");
  const externalDb = await fetch(
    `https://${projectName}.${userName}.vercel.app/api/db`
  )
    .then((serverResp) => {
      if (serverResp.ok) {
        return serverResp.json();
      }

      throw new Error("Falha ao pegar os dados");
    })
    .then((objectResp) => objectResp)
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });

  return {
    props: {
      externalDb,
    },
  };
}
