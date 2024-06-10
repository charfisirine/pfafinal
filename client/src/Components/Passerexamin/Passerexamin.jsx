/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./passerexamin.css";
import { Box, Card, Grid, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getExamsList,
  getexamResults,
  postSubmitQuestions,
} from "../creerexamin/creerexamSaga";
import { useNavigate, useParams } from "react-router-dom";
// import { useParams, useNavigate } from "react-router-dom";

import { setQuestionsList } from "../creerquestion/creerquestionSlice";
import { setExamSubmitted } from "../creerexamin/creerexamSlice";

const Passerexamin = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [selectedOptions, setSelectedOptions] = useState(Array(2).fill([]));
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0); // Using index instead of number
  const dispatch = useDispatch();
  const [currentExam, setCurrentExam] = useState(null);
  const [passedExam, setPassedExam] = useState(null);
  const { exams, examResults, examSubmitted } = useSelector(
    (state) => state.exams
  );
  const [remainingSeconds, setRemainingSeconds] = useState(null);

  useEffect(() => {
    if (remainingSeconds === 0) {
      handleFinishExam();
    }
  }, [remainingSeconds]);

  useEffect(() => {
    if (currentExam) {
      const interval = setInterval(() => {
        setRemainingSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentExam]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  useEffect(() => {
    if (examSubmitted) {
      navigate(`/Resultat/${examSubmitted}`);
      dispatch(setExamSubmitted(null));
    }
  }, [examSubmitted]);

  useEffect(() => {
    if (!exams) {
      dispatch(getExamsList());
    } else {
      const exam = exams.find((elt) => elt.id === parseInt(id));
      setRemainingSeconds(exam.duree * 60);
      setCurrentExam(exam);
      setSelectedOptions(Array(exam.questions.length).fill([]));
      if (exam && exam.questions) {
        dispatch(setQuestionsList(exam.questions));
      }
    }
  }, [exams]);

  useEffect(() => {
    if (!examResults) {
      dispatch(getexamResults());
    } else {
      if (
        examResults.some(
          (elt) => elt.examenID == id && elt.candidatID === user.id
        )
      ) {
        const result = examResults.find(
          (elt) => elt.examenID == id && elt.candidatID === user.id
        );
        navigate(`/Resultat/${result.id}`);
      } else {
        setPassedExam(false);
      }
    }
  }, [examResults]);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    let tempSelectedOptions = [...selectedOptions];
    if (selectedQuestion.type === "SingleChoice") {
      tempSelectedOptions[selectedQuestionIndex] = [selectedValue];
      setSelectedOptions(tempSelectedOptions);
    } else {
      if (
        tempSelectedOptions[selectedQuestionIndex].some(
          (elt) => elt === selectedValue
        )
      ) {
        setSelectedOptions(
          tempSelectedOptions.map((item, index) => {
            if (index === selectedQuestionIndex) {
              return item.filter((elt) => elt !== selectedValue);
            } else {
              return [...item];
            }
          })
        );
      } else {
        setSelectedOptions(
          tempSelectedOptions.map((item, index) => {
            if (index === selectedQuestionIndex) {
              return [...item, selectedValue];
            } else {
              return [...item];
            }
          })
        );
      }
    }
  };

  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index);
  };
  const handleFinishExam = () => {
    dispatch(
      postSubmitQuestions({
        examenID: id,
        candidatID: user.id,
        candidatName: user.nom_complet,
        reponse_choisis: selectedOptions,
        formateurID: currentExam.formateurs.id,
      })
    );
  };

  if (!currentExam || passedExam === null) {
    return <div>Loading...</div>;
  }

  const selectedQuestion = currentExam.questions[selectedQuestionIndex];

  return (
    <div className="container-quiz">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card sx={{ maxWidth: 1000, width: "100%", marginTop: "2rem" }}>
          <CardContent>
            <h1 className="quiz-title">{currentExam.titre}</h1>
            <h1 className="remaining-time">
              Temps Restant: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
            <Grid container spacing={6}>
              <Grid item xs={12} md={7}>
                <section className="question-section">
                  <div className="question">
                    <h2 className="question-num">
                      Question {selectedQuestionIndex + 1} (
                      {selectedQuestion.type})
                    </h2>
                    <p className="question-text">
                      {selectedQuestion.ennonce_question}
                    </p>
                  </div>
                  <div className="answer">
                    {selectedQuestion.reponse_propose.map((reponse, index) => (
                      <label
                        key={index}
                        className={`answer-item ${
                          selectedOptions[selectedQuestionIndex].some(
                            (item) => item === reponse.value
                          )
                            ? "checked"
                            : ""
                        }`}
                      >
                        <input
                          id="response-checkbox"
                          type={
                            selectedQuestion.type === "Multiplechoices"
                              ? "checkbox"
                              : "radio"
                          }
                          name="options"
                          value={reponse.value}
                          onChange={handleOptionChange}
                        />
                        <span>{reponse.value}</span>
                      </label>
                    ))}
                  </div>
                  <div className="action-quiz">
                    <button
                      className="btn-quiz"
                      disabled={selectedQuestionIndex === 0}
                      onClick={() =>
                        handleQuestionClick(selectedQuestionIndex - 1)
                      }
                    >
                      Prev
                    </button>
                    <button
                      className="btn-quiz"
                      disabled={
                        selectedQuestionIndex ===
                        currentExam.questions.length - 1
                      }
                      onClick={() =>
                        handleQuestionClick(selectedQuestionIndex + 1)
                      }
                    >
                      Next
                    </button>
                  </div>
                </section>
              </Grid>
              <Grid item xs={12} md={5}>
                <section className="questions-nav-section">
                  <p className="question-context">
                    <span className="question-num">
                      Question {selectedQuestionIndex + 1}/
                      {currentExam.questions.length}
                    </span>
                  </p>
                  <div className="d-flex">
                    <ul className="question-nums-list">
                      {currentExam.questions.map((_, index) => (
                        <li key={index}>
                          <a
                            className={
                              index === selectedQuestionIndex
                                ? "active"
                                : selectedOptions[index].length === 0
                                ? "vide"
                                : "done"
                            }
                            href="#"
                            onClick={() => handleQuestionClick(index)}
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <br />
                  <button
                    onClick={handleFinishExam}
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      padding: "0.5rem 1rem",
                      color: "#1976d2",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Terminer le test
                  </button>
                </section>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Passerexamin;
