import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getExamsList, getexamResults } from "../creerexamin/creerexamSaga";
import { Box, Button, Grid } from "@mui/material";

const calculateScore = (correctAnswers, chosenAnswers, questionScore) => {
  const correctSet = new Set(correctAnswers);

  let correctCount = 0;
  for (const answer of chosenAnswers) {
    if (correctSet.has(answer)) {
      correctCount++;
    }
  }

  const maxCorrectAnswers = correctAnswers.length;
  const score = (correctCount / maxCorrectAnswers) * questionScore;

  return score;
};

const Resultat = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { exams, examResults } = useSelector((state) => state.exams);
  const [result, setResult] = useState(null);
  const [totalScore, setTotalScrore] = useState(null);
  const [totalNote, setTotalNote] = useState(null);
  const [currentExam, setCurrentExam] = useState(null);

  useEffect(() => {
    if (!exams) {
      dispatch(getExamsList());
    }
  }, [exams]);

  useEffect(() => {
    if (!examResults) {
      dispatch(getexamResults());
    }
  }, [examResults]);

  useEffect(() => {
    if (exams && examResults && id) {
      const currentResult = examResults.find((elt) => elt.id == id);

      const exam = exams.find((item) => item.id === currentResult.examenID);
      setCurrentExam(exam);
      let tempResponses = exam.questions.map((rep, index) => {
        const correctAnswersStrings = rep.reponse_correcte.map(
          (elt) => elt.value
        );
        return {
          id: rep.id,
          reponse_propose: rep.reponse_propose,
          reponse_correcte: rep.reponse_correcte,
          note: rep.note,
          type: rep.type,
          difficulte: rep.difficulte,
          ennonce_question: rep.ennonce_question,
          reponse_choisis: JSON.parse(currentResult.reponse_choisis)[index],
          score: calculateScore(
            correctAnswersStrings,
            JSON.parse(currentResult.reponse_choisis)[index],
            rep.note
          ),
        };
      });
      setResult(tempResponses);
    }
  }, [exams, examResults, id]);

  useEffect(() => {
    if (result && currentExam) {
      const sumOfScores = result.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.score;
      }, 0);
      const sumOfNotes = result.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.note;
      }, 0);
      setTotalScrore(sumOfScores);
      setTotalNote(sumOfNotes);
    }
  }, [result, currentExam]);

  if (!result && !totalScore) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, marginLeft: "20rem", marginTop: "3rem" }}>
      <h2>Examen: {currentExam?.titre}</h2>
      <h2>
        Résultat de l'examen: {totalScore} / {totalNote}{" "}
        {(totalScore / totalNote) * 100 > currentExam.pourcentage_reussite ? (
          <span style={{ color: "green" }}>Admis</span>
        ) : (
          <span style={{ color: "red" }}>Refus</span>
        )}
      </h2>

      {result.map((question, index) => (
        <div key={index}>
          <h3>
            {index + 1}- Enoncé : {question.ennonce_question}
          </h3>
          <Grid container>
            <Grid item xs={6}>
              <p>Réponses correctes :</p>
              <ul>
                {question.reponse_propose.map((reponse, index) => (
                  <li
                    key={index}
                    style={{
                      color: question.reponse_correcte.some(
                        (elt) => elt.value === reponse.value
                      )
                        ? "green"
                        : "red",
                    }}
                  >
                    {reponse.value}
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={6}>
              <p>Votre Réponse :</p>
              <ul>
                {question.reponse_propose.map((reponse, index) => (
                  <li
                    key={index}
                    style={{
                      color: question.reponse_choisis.some(
                        (elt) => elt === reponse.value
                      )
                        ? "blue"
                        : "black",
                    }}
                  >
                    {reponse.value}
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        </div>
      ))}
    </Box>
  );
};

export default Resultat;
