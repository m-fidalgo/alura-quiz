/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizLogo from "../src/components/QuizLogo";
import QuizBgd from "../src/components/QuizBgd";
import QuizContainer from "../src/components/QuizContainer";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import Link from "../src/components/Link";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    <QuizBgd backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Input
                name="nomeDoUsuario"
                value={name}
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, userName] = linkExterno
                  .replace(/\//g, "")
                  .replace("https:", "")
                  .replace(".vercel.app", "")
                  .split(".");
                return (
                  <li>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${userName}`}
                    >
                      {`${userName}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/m-fidalgo" />
    </QuizBgd>
  );
}
