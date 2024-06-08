import React, { useEffect, useState } from "react";
import { Box, Button, CardActions, Grid } from "@mui/material";
import "./creerexamin.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { postExamForm } from "./creerexamSaga";

const CreerExamin = () => {
  const formateurID = useSelector(state => state.user.id);
  useEffect(() => {
    if (formateurID) {
      setForm(prevForm => ({
        ...prevForm,
        formateurID: formateurID,
      }));
    }
  }, [formateurID]);
  const dispatch = useDispatch(); 
  const [form, setForm] = useState({
    categorie: '',
    sub_categorie: '',
    duree: '',
    pourcentage_reussite: '',
    date: new Date().toISOString().slice(0, 10),    titre: '', 
    formateurID: 1 
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(postExamForm(form));
  };
  const navigate = useNavigate();

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

  const navigateToQuestions = () => {
    navigate("/Questions"); // Navigate to '/questions' route
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "90%",
        paddingLeft: "19rem",
        paddingRight: "6rem",
      }}
    >
      <Card>
        <CardContent
          sx={{
            paddingLeft: "6rem",
          }}
        >
          <h1 className="margin-bottom color-text">Ajouter examin</h1>
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
                  label="Titre"
                  name="titre"
                  type="text"
                  value={form.titre}
                  onChange={handleChange}
                  helperText="Please enter the title of the exam"
                />
              </Grid>
              <Grid item xs={5}>
              <TextField
                  fullWidth
                  select
                  label="Categorie"
                  name="categorie"
                  value={form.categorie}
                  onChange={handleChange}
                  helperText="Please select your Categorie"
                >
                  {categories.map((option) => (
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
                  label="Sub Categorie"
                  name="sub_categorie"
                  value={form.sub_categorie}
                  onChange={handleChange}
                  helperText="Please select your sub categorie"
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {/* <Grid item xs={5}>
                <TextField
                  fullWidth
                  id="date"
                  label="Date"
                  type="date"
                  helperText="Please select the date of the exam"
                  defaultValue={new Date().toISOString().substr(0, 10)} // sets default value to current date
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid> */}
              <Grid item xs={5}>
              <TextField
                  fullWidth
                  label="Duration (minutes)"
                  name="duree"
                  type="number"
                  value={form.duree}
                  onChange={handleChange}
                  helperText="Please select the duration of the exam"
                />
              </Grid>
              <Grid item xs={5}>
              <TextField
                  fullWidth
                  label="Pourcentage de réussite (%)"
                  name="pourcentage_reussite"
                  type="number"
                  value={form.pourcentage_reussite}
                  onChange={handleChange}
                  helperText="Select the pourcentage de réussite de l'examen"
                />
              </Grid>


              <Grid
                item
                xs={5}
                sx={{
                  justifyContent: "center",

                }}
              >                
                <Button variant="outlined" onClick={navigateToQuestions}>
                  Input questions of the exam
                </Button>
                <a href="/Questions" className=" Questions color-text">
                  Questions 
                </a>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <CardActions>
          <Button variant="contained" onClick={handleSubmit}>Ajouter</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CreerExamin;
