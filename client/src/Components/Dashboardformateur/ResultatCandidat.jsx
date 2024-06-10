import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CardContent } from "@mui/material";

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

  useEffect(() => {
    if (!exams) {
      dispatch(getExamsList());
    }
  }, [exams]);

  useEffect(() => {
    if (exams && examResults) {
      const currentResults = examResults
        .filter((elt) => elt.formateurID == user.id)
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
          console.log({tempResponses})
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
            resultat: `${sumOfScores} / ${sumOfNotes}` ,
            status:
              (sumOfScores / sumOfNotes) * 100 > exam.pourcentage_reussite
                ? "Admis"
                : "Refus",
          };
        });
        setCandidatList(currentResults)
    }
  }, [exams, examResults]);

  useEffect(() => {
    if (!examResults) {
      dispatch(getexamResults());
    }
  }, [examResults]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "examen", headerName: "Examen", width: 220 },
    { field: "nom_etudiant", headerName: "Nom Candidat", width: 220 },
    { field: "resultat", headerName: "Résultat", width: 220 },
    { field: "status", headerName: "Admis/Refus", width: 220 },
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
          <h2 className="margintop margin-bottom">Resultat candidat:</h2>
          <DataGrid
            getRowId={(row) => row.id}
            rows={candidatList || []}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10]}
            hideFooterSelectedRowCount
          />
        </CardContent>
      </Box>
    </Box>
  );
};
