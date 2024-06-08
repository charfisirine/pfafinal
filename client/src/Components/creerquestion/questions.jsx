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
import { getQuestionsList, postExamForm, postQuestionsList } from "../creerexamin/creerexamSaga";
const Questions = () => {
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
  const { questions } = useSelector((state) => state.exams);
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
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!questions) {
      dispatch(getQuestionsList());
    }
  }, []);

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
    // {
    //   value: "CodeBlock",
    //   label: "Code Block",
    // },
  ];
  const steps = ["Select type e", "Create an ad group", "Create an ad"];
  const [open, setOpen] = React.useState(false);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },

    {
      field: "question",
      headerName: "question",
      type: "string",
      width: 220,
    },
    {
      field: "reponse",
      headerName: "reponse",
      type: "string",
      width: 220,
    },
    {
      field: "type",
      headerName: "type",
      type: "string",
      width: 160,
    },

    {
      field: "Actions",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleView(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      question: "What is capture/playback?",
      reponse: "ahis is the ISTQB Glossary definition",
      type: "Single Choice",
    },
    {
      id: 2,
      question: "What is capture/playback?",
      reponse: "This is the ISTQB Glossary definition",
      type: "Single Choice",
    },
    {
      id: 3,
      question: "What is capture/playback?",
      reponse: "This is the ISTQB Glossary definition",
      type: "Single Choice",
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {/* Modal  add question*/}

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: "70rem",
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          {/* le contenu du modal */}
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Card>
              <CardContent
                sx={{
                  paddingLeft: "6rem",
                }}
              >
                <h3 className="margin-bottom">Ajouter question</h3>
                <Box
                  component="form"
                  sx={{
                    flexGrow: 1,
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={6}>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        id="note"
                        name="note"
                        label="Note de l'examin"
                        type="number"
                        helperText="Note de l'examin"
                        InputProps={{ inputProps: { min: 1 } }}
                        onChange={handleChange}
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
                    ) : selectedQuestionType === "CodeBlock" ? (
                      <Grid
                        style={{
                          marginTop: "2rem",
                          transform: "translateY(-4rem)",
                        }}
                        container
                        spacing={1}
                      >
                        <AceEditor
                          mode="javascript"
                          theme="github"
                          name="editor"
                          fontSize={14}
                          width="100%"
                          height="13rem"
                          showPrintMargin={true}
                          showGutter={true}
                          highlightActiveLine={true}
                          value={`// Votre code ici`}
                          setOptions={{
                            useWorker: false,
                            showLineNumbers: true,
                            tabSize: 2,
                          }}
                        />
                      </Grid>
                    ) : (
                      <p>choisir le type de question</p>
                    )}
                  </Grid>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  disabled={!reponses.some((elt) => elt.checked === true)}
                  onClick={() => {
                    console.log({ reponses });
                    console.log({ selectedQuestionType });
                    console.log({ form });
                    dispatch(
                      postQuestionsList({
                        ...form,
                        reponse_propose: reponses.map(
                          (reponse) => reponse.value
                        ),
                        reponse_correcte: reponses
                          .filter((reponse) => reponse.checked === true)
                          .map((reponse) => reponse.value),
                      })
                    );
                  }}
                >
                  Ajouter Question
                </Button>
              </CardActions>
            </Card>
          </Box>
          {/* fin du contenu du modal */}
        </Sheet>
      </Modal>

      {/* Fin modal add question */}
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
          <h2 className="margintop margin-bottom">Liste des questions:</h2>
          <Button
            sx={{
              marginBottom: "2rem",
            }}
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add Question
          </Button>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Questions;
