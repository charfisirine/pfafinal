import React, { useState } from "react";
import "./passerexamin.css";
import { Box, Card, Grid, CardContent } from "@mui/material";

const Passerexamin = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(11); // Suivre le numéro de la question sélectionnée

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  const handleQuestionClick = (num) => {
    setSelectedQuestion(num);
  };

  return (
    <div className="container-quiz">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ maxWidth: 1000, width: '100%',marginTop: "2rem"}}>
          <CardContent >
            <h1 className="quiz-title">Quiz Title</h1>
            <Grid container spacing={6}>
              <Grid item xs={12} md={7}>
                <section className="question-section">
                  <div className="question">
                    <h2 className="question-num">Question {selectedQuestion}</h2>
                    <p className="question-text">
                      Which lifecycle method is called after a component is rendered for the first time?
                    </p>
                  </div>
                  <div className="answer">
                    <label className={`answer-item ${selectedOption === "option1" ? "checked" : ""}`}>
                      <input
                        type="radio"
                        name="options"
                        value="option1"
                        onChange={handleOptionChange}
                      />
                      <span>componentDidMount</span>
                    </label>
                    <label className={`answer-item ${selectedOption === "option2" ? "checked" : ""}`}>
                      <input
                        type="radio"
                        name="options"
                        value="option2"
                        onChange={handleOptionChange}
                      />
                      <span>componentDidUpdate</span>
                    </label>
                    <label className={`answer-item ${selectedOption === "option3" ? "checked" : ""}`}>
                      <input
                        type="radio"
                        name="options"
                        value="option3"
                        onChange={handleOptionChange}
                      />
                      <span>componentWillMount</span>
                    </label>
                    <label className={`answer-item ${selectedOption === "option4" ? "checked" : ""}`}>
                      <input
                        type="radio"
                        name="options"
                        value="option4"
                        onChange={handleOptionChange}
                      />
                      <span>componentWillUpdate</span>
                    </label>
                  </div>
                  <div className="action-quiz">
                    <button className="btn-quiz">Prev</button>
                    <button className="btn-quiz">Next</button>
                  </div>
                </section>
              </Grid>
              <Grid item xs={12} md={5}>
                <section className="questions-nav-section">
                  <p className="question-context">
                    <a href="#">
                      <span className="question-num">Question {selectedQuestion}/20</span>
                    </a>
                    <a href="#">
                      <span className="question-help">Need Help?</span>
                    </a>
                  </p>
                  <div className="d-flex">
                    <ul className="question-nums-list">
                      {[...Array(20).keys()].map((num) => (
                        <li key={num + 1}>
                          <a
                            className={num + 1 === selectedQuestion ? "active" : "done"}
                            href="#"
                            onClick={() => handleQuestionClick(num + 1)}
                          >
                            {num + 1}
                          </a>
                        </li>
                       
                      ))}
                    </ul>
                  </div>
                  <br/>
                  <button      style={{
                fontWeight: 700,
                fontSize: "0.9rem",
                padding: "0.5rem 1rem", 
                color: "#1976d2", 
                border: "none", // removed border for better appearance
                cursor: "pointer", // added cursor change on hover
              }}>terminer le test</button>
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
