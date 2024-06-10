import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  CardContent,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { deleteExamForm, getExamsList } from "../creerexamin/creerexamSaga";
import { useNavigate } from "react-router-dom";
import { QuestionsContent } from "./QuestionsContent";
import { assignQuestionsToExam } from "../creerquestion/creerquestionSaga";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ExamsContent = () => {
  const { exams } = useSelector((state) => state.exams); // Changez l'accès à l'état
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [examenId, setExamenId] = React.useState(null);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!exams) {
      dispatch(getExamsList());
    }
  }, [dispatch, exams]);

  const handleDelete = (id) => {
    console.log("Supprimer la ligne avec l'ID :", id);
    dispatch(deleteExamForm({ id }));
  };

  const handleEdit = (id) => {
    console.log("Éditer la ligne avec l'ID :", id);
    navigate(`/ModifierExamen/${id}`);
  };

  const handleView = (id) => {
    console.log("Voir la ligne avec l'ID :", id);
    const selectedExam = exams.find((item) => item.id === id);
    console.log({ selectedExam });
    console.log({ id });
    if (selectedExam) {
      const tempSelectedItems = selectedExam?.questions?.map((qst) => qst.id);
      setSelectedItems(tempSelectedItems);
    }

    setOpen(true);
    setExamenId(id);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "titre", headerName: "Nom Examen", width: 180 },
    { field: "categorie", headerName: "Categorie", width: 220 },
    {
      field: "pourcentage_reussite",
      headerName: "Pourcentage de Réussite",
      width: 180,
    },
    { field: "duree", headerName: "Duration", width: 100 },
    { field: "nbre_question", headerName: "nombre de question", width: 140 },
    {
      field: "Actions",
      headerName: "Actions",
      sortable: false,
      width: 250,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon className="redicon" />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon className="greenicon" />
          </IconButton>
          <Button
            style={{ fontSize: 10 }}
            size="small"
            onClick={() => handleView(params.row.id)}
          >
            Assigner les Questions
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <QuestionsContent
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
          <Button
            variant="contained"
            onClick={() => {
              dispatch(
                assignQuestionsToExam({
                  examen_id: examenId,
                  body: { question_ids: selectedItems },
                })
              );
              setOpen(false);
            }}
          >
            Enregistrer
          </Button>
        </Box>
      </Modal>

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

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: "5rem" }}>
            <h2 className="margintop margin-bottom">Liste des Examens:</h2>
            <Button
              onClick={() => {
                navigate("/CreerExamen");
              }}
              sx={{ color: "white", bgcolor: "#1976d2", marginLeft: "auto" ,marginBottom:"2rem"}}
              >
              Créer Examen
            </Button>
            </Box>

            <DataGrid
              getRowId={(row) => row.id}
              rows={exams || []}
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
    </>
  );
};
