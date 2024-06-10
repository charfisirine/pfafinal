import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CardContent, Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getExamsList, getexamResults } from "../creerexamin/creerexamSaga";

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

export const ResultatCandidat = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { examResults, exams } = useSelector((state) => state.exams);

  const [candidatList, setCandidatList] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCertificatId, setSelectedCertificatId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!exams) {
      dispatch(getExamsList());
    }
  }, [dispatch, exams]);

  useEffect(() => {
    if (exams && examResults) {
      const currentResults = examResults
        .filter((elt) => elt.formateurID === user.id)
        .map((item) => {
          const exam = exams.find((elt) => elt.id === item.examenID);
          let tempResponses = exam.questions.map((rep, index) => {
            const correctAnswersStrings = rep.reponse_correcte.map(
              (elt) => elt.value
            );
            return {
              id: rep.id,
              note: rep.note,
              score: calculateScore(
                correctAnswersStrings,
                JSON.parse(item.reponse_choisis)[index],
                rep.note
              ),
            };
          });
          console.log({ tempResponses });
          const sumOfScores = tempResponses.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue.score;
            },
            0
          );
          const sumOfNotes = tempResponses.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue.note;
            },
            0
          );
          return {
            id: item.id,
            examen: item.examens.titre,
            nom_etudiant: item.candidatName,
            resultat: `${sumOfScores} / ${sumOfNotes}`,
            status:
              (sumOfScores / sumOfNotes) * 100 > exam.pourcentage_reussite
                ? "Admis"
                : "Refus",
          };
        });
      setCandidatList(currentResults);
    }
  }, [exams, examResults, user.id]);

  useEffect(() => {
    if (!examResults) {
      dispatch(getexamResults());
    }
  }, [dispatch, examResults]);

  const handleViewCertificat = (id) => {
    setSelectedCertificatId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = [
    { field: "examen", headerName: "Examen", width: 220 },
    { field: "resultat", headerName: "Résultat", width: 220 },
    { field: "status", headerName: "Admis/Refus", width: 220 },
    {
      field: "Certificat",
      headerName: "Certificat",
      width: 220,
      renderCell: (params) => (
        params.row.status === "Admis" ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleViewCertificat(params.row.id)}
          >
            Voir Certificat
          </Button>
        ) : (
          <span>Vous n'avez pas un certificat</span>
        )
      ),
    },
  ];

  if (!candidatList) {
    return <div>Loading ....</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        height: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "90%",
        }}
      >
        <CardContent sx={{ marginLeft: "5rem" }}>
          <h2 className="margintop margin-bottom">Résultats des Examens Passés :</h2>
          <DataGrid
            getRowId={(row) => row.id}
            rows={candidatList || []}
            columns={columns}
            pageSize={5}
            hideFooterSelectedRowCount
          />
        </CardContent>
      </Box>

      {/* Modal pour afficher le certificat */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", border: "2px solid #000", boxShadow: 24, p: 4, maxWidth: 400 }}>
        <h2 id="modal-title">Certificat</h2>
          <p id="modal-description">
            <p>Titre de l'examen: </p>
          </p>
          <Button onClick={handleCloseModal}>Fermer</Button>
          <Button style={{color:"red"}}>Télecharger pdf</Button>

        </Box>
      </Modal>
    </Box>
  );
};
