import React, { useEffect } from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { getExamsList } from "../creerexamin/creerexamSaga";
import page from "../../assets/page.png";

const Home = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exams.exams);

  useEffect(() => {
    dispatch(getExamsList());
  }, [dispatch]);

  const getRandomColor = () => {
    const colors = [
      "#56B8D1",
      "#D5D4E5",
      "#D7B4BF",
      "#82C9D1",
      "#F88F52",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomDescription = () => {
    const descriptions = [
      { description: "Description 1" },
      { description: "Description 2" },
      { description: "Description 3" },
      { description: "Description 4" },
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  return (
    <div>
      <section id="home" className="hero-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12 col-12">
              <div className="hero-content">
                <h1 className="wow fadeInLeft" data-wow-delay=".4s">
                Dynamisez votre parcours vers l’excellence en matière de certification. </h1>
                <p className="wow fadeInLeft" data-wow-delay=".6s">
                En donnant aux individus les clés de l’excellence en matière de certification, nous ouvrons la voie vers des réalisations sans
                 limites et une croissance professionnelle.
                </p>
                <form className="search-form">
                  <input
                    className="input-search"
                    type="text"
                    placeholder="Recherche..."
                  />
                  <button className="button-search" type="submit">
                  rechercher
                  </button>
                  {/* <Button  variant="contained" startIcon={<DeleteIcon />} type="submit">Search</Button> */}
                </form>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 col-12">
              <div className="hero-image wow fadeInRight" data-wow-delay=".4s">
                <img src={page} alt="Laptop" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features section">
        <div className="">
          <div className="row">
            <div className="col-24">
              <div className="section-title">
                <h2 className="wow fadeInUp" data-wow-delay=".4s">
                  "ÉLEVEZ VOTRE RÉUSSITE AVEC NOS CERTIFICATIONS !"
                </h2>
                <p className="wow fadeInUp" data-wow-delay=".6s">
                  Nous proposons une multitude de certifications pour répondre à
                  tous vos besoins !
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container top-distance-xl">
          <Grid container spacing={4}>
            {exams && Array.isArray(exams) && exams.length > 0 ? (
              exams.map((exam, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <div
                    className="single-feature wow fadeInUp"
                    data-wow-delay=".2s"
                  >
                    <Box
                      sx={{
                        height: 150,
                        backgroundColor: getRandomColor(),
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5" component="div" color="white">
                        {exam.titre.toUpperCase()}
                      </Typography>
                    </Box>
                    <Typography  className="top-distance" style={{
                        padding: "5px",
                        borderRadius: "5px",
                        color: "black",
                      }} variant="h5" component="div" color="black">
                      {exam.titre.toUpperCase()}
                    </Typography>{" "}
                    <Typography variant="h5"  style={{
                        padding: "5px",
                        borderRadius: "5px",
                        color: "black",
                      }}component="div" color="white">
                        {exam.description}
                      </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className="top-distance"
                    >
                      Passer Examen
                    </Button>
                  </div>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" component="div" color="textSecondary">
                Pas d'examen
              </Typography>
            )}
          </Grid>
        </div>
      </section>
    </div>
  );
};

export default Home;
