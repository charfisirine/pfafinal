import React, { useEffect, useState } from "react";
import "./questions.css";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-javascript";
import {
  Button,
  CardActions,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  TextField,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsList, putQuestionForm } from "./creerquestionSaga";
import { useNavigate, useParams } from "react-router-dom";
import { setQuestionpdated } from "./creerquestionSlice";

export const ModifierQuestions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  const formateurID = useSelector((state) => state.user.id);
  const { questions, questionUpdated } = useSelector(
    (state) => state.questions
  );

  const typequestion = [
    {
      value: "Avancee",
      label: "Avancée",
    },
    {
      value: "Basé",
      label: "basé",
    },
  ];

  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [reponses, setReponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [form, setForm] = useState({
    ennonce_question: "",
    reponse_propose: "",
    reponse_correcte: "",
    type: "",
    categorie: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (questionUpdated) {
      dispatch(setQuestionpdated(null));
      navigate("/DashboardFormateur/?tab=question-list");
    }
  }, [dispatch, questionUpdated]);

  useEffect(() => {
    if (!questions) {
      dispatch(getQuestionsList());
    } else {
      const currentQuestion = questions.filter(
        (question) => question.id === parseInt(id)
      );
      if (currentQuestion) {
        setForm(currentQuestion[0]);
        setSelectedQuestionType(currentQuestion[0].type);
        const tempReponses = currentQuestion[0].reponse_propose.map((item) => {
          if (
            currentQuestion[0].reponse_correcte.some(
              (elt) => elt.key === item.key
            )
          ) {
            return {
              ...item,
              checked: true,
            };
          } else {
            return {
              ...item,
              checked: false,
            };
          }
        });
        setReponses(tempReponses);
      }
    }
  }, [dispatch, questions]);

  useEffect(() => {
    if (formateurID) {
      setForm((prevForm) => ({
        ...prevForm,
        formateurID: formateurID,
      }));
    }
  }, [formateurID]);

  const questionTypes = [
    {
      value: "SingleChoice",
      label: "Single Choice ",
    },
    {
      value: "Multiplechoices",
      label: "Multiple choices",
    },
  ];

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "90%",
        margin: "4rem",
        padding: "4rem",
      }}
    >
      <CardContent
        sx={{
          width: "60rem",
        }}
      >
        <Card>
          <CardContent
            sx={{
              paddingLeft: "6rem",
            }}
          >
            <h3 className="margin-bottom">Modifier question</h3>
            <Grid container spacing={6}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="note"
                  name="note"
                  label="Note du question"
                  type="number"
                  helperText="Note du question"
                  InputProps={{ inputProps: { min: 1 } }}
                  onChange={handleChange}
                  value={form.note}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="categorie"
                  name="categorie"
                  select
                  label="Categorie"
                  helperText="Please select your Categorie"
                  onChange={handleChange}
                  value={form.categorie}
                >
                  {typequestion.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="type"
                  name="type"
                  select
                  label="Type Question"
                  value={selectedQuestionType}
                  onChange={(e) => {
                    setSelectedQuestionType(e.target.value);
                    handleChange(e);
                  }}
                >
                  {questionTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="ennonce_question"
                  name="ennonce_question"
                  label="Question"
                  placeholder="Question"
                  multiline
                  onChange={handleChange}
                  value={form.ennonce_question}
                />
              </Grid>
              <Grid item xs={5}>
                {(selectedQuestionType === "Multiplechoices" ||
                  selectedQuestionType === "SingleChoice") && (
                  <TextField
                    fullWidth
                    id="outlined-textarea"
                    label="Reponse"
                    placeholder="Reponse"
                    multiline
                    value={currentResponse}
                    onChange={(e) => {
                      setCurrentResponse(e.target.value);
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={5}>
                {(selectedQuestionType === "Multiplechoices" ||
                  selectedQuestionType === "SingleChoice") && (
                  <Button
                    variant="outlined"
                    disabled={currentResponse.length === 0}
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setReponses([
                        ...reponses,
                        {
                          key: reponses.length,
                          value: currentResponse,
                          checked: false,
                        },
                      ]);
                      setCurrentResponse("");
                    }}
                  >
                    Ajouter Reponse
                  </Button>
                )}
              </Grid>
            </Grid>

            <Grid style={{ marginTop: "2rem" }} container spacing={1}>
              {selectedQuestionType === "Multiplechoices" ? (
                reponses.map((elt) => (
                  <Grid key={elt.key} item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={elt.checked}
                          onChange={() => {
                            setReponses((oldState) =>
                              oldState.map((item) =>
                                item.key === elt.key
                                  ? { ...item, checked: !item.checked }
                                  : item
                              )
                            );
                          }}
                        />
                      }
                      label={elt.value}
                    />
                  </Grid>
                ))
              ) : selectedQuestionType === "SingleChoice" ? (
                reponses.map((elt) => (
                  <Grid key={elt.key} item xs={12}>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={elt.checked}
                          onChange={() => {
                            setReponses((oldState) =>
                              oldState.map((item) =>
                                item.key === elt.key
                                  ? { ...item, checked: true }
                                  : { ...item, checked: false }
                              )
                            );
                          }}
                        />
                      }
                      label={elt.value}
                    />
                  </Grid>
                ))
              ) : (
                <p>choisir le type de question</p>
              )}
            </Grid>
            {/* </Box> */}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              disabled={!reponses.some((elt) => elt.checked === true)}
              onClick={() => {
                dispatch(
                  putQuestionForm({
                    id,
                    body: {
                      ...form,
                      reponse_propose: reponses.map((reponse) => {
                        return {
                          value: reponse.value,
                          key: reponse.key,
                        };
                      }),
                      reponse_correcte: reponses
                        .filter((reponse) => reponse.checked === true)
                        .map((reponse) => {
                          return {
                            value: reponse.value,
                            key: reponse.key,
                          };
                        }),
                    },
                  })
                );
              }}
            >
              Modifier Question
            </Button>
          </CardActions>
        </Card>
      </CardContent>
    </Card>
  );
};
