import React, { useEffect, useState } from "react";
import { DataGrid, GridDeleteIcon } from "@mui/x-data-grid";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import "./questions.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-javascript";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  CardActions,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Radio,
  TextField,
} from "@mui/material";
import { Sheet } from "@mui/joy";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsList, postQuestionsList } from "./creerquestionSaga";
import { setQuestioncreated } from "./creerquestionSlice";
import { useNavigate } from "react-router-dom";

export const Questions = () => {
  const dispatch = useDispatch();
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
  const { questions, questionCreated } = useSelector((state) => state.questions);
  const navigate = useNavigate()
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [reponses, setReponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [form, setForm] = useState({
    ennonce_question: null,
    reponse_propose: null,
    reponse_correcte: null,
    type: null,
    categorie: null,
    note: null,
    difficulte: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!questions) {
      dispatch(getQuestionsList());
    }
  }, []);

  useEffect(() => {
    if (questionCreated) {
      dispatch(setQuestioncreated(null));
      navigate("/DashboardFormateur/?tab=question-list")
    }
  }, [questionCreated]);

  

  const handleDelete = (id) => {
    console.log("Supprimer la ligne avec l'ID :", id);
  };

  const handleEdit = (id) => {
    console.log("Éditer la ligne avec l'ID :", id);
  };

  const handleView = (id) => {
    console.log("Voir la ligne avec l'ID :", id);
  };
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

  const categories = [
    {
      value: "Genie_Informatique",
      label: "Informatique",
    },
    {
      value: "Genie_civil",
      label: "Genie civil",
    },
    {
      value: "Genie_industrielle",
      label: "Genie industrielle",
    },
    {
      value: "Data_science",
      label: "Data science",
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
            <h3 className="margin-bottom">Ajouter question</h3>
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
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="difficulte"
                  name="difficulte"
                  select
                  label="Difficulté"
                  helperText="Veuillez sélectionner votre difficulté"
                  onChange={handleChange}
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
                  select
                  label="Categorie"
                  name="categorie"
                  value={form.categorie}
                  onChange={handleChange}
                  helperText="Veuillez sélectionner votre catégorie"
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  id="ennonce_question"
                  name="ennonce_question"
                  label="Question"
                  placeholder="Question"
                  multiline
                  onChange={handleChange}
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
                  postQuestionsList({
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
                  })
                );
              }}
            >
              Ajouter Question
            </Button>
          </CardActions>
        </Card>
      </CardContent>
    </Card>
  );
};
