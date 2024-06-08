import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CardContent, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { deleteExamForm, getExamsList } from "../creerexamin/creerexamSaga";
import { useNavigate } from "react-router-dom";

export const ExamsContent = () => {
  const { exams, loading } = useSelector((state) => state.exams); // Changez l'accès à l'état
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "categorie", headerName: "Categorie", width: 220 },
    { field: "sub_categorie", headerName: "Sub Categorie", width: 180 },
    {
      field: "pourcentage_reussite",
      headerName: "Pourcentage de Réussite",
      width: 180,
    },
    { field: "duree", headerName: "Duration", width: 140 },
    {
      field: "Actions",
      headerName: "Actions",
      sortable: false,
      width: 220,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon className="redicon" />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon className="greenicon" />
          </IconButton>
          <IconButton onClick={() => handleView(params.row.id)}>
            <VisibilityIcon className="blueicon" />
          </IconButton>
        </div>
      ),
    },
  ];

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
        <CardContent>
          <h2 className="margintop margin-bottom">Liste des Examens:</h2>
          <DataGrid
            getRowId={(row) => row.id}
            rows={exams || []}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </CardContent>
      </Box>
    </Box>
  );
};
