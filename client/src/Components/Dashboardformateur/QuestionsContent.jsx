import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CardContent, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  deleteQuestionsList,
  getQuestionsList,
} from "../creerquestion/creerquestionSaga";
import { useNavigate } from "react-router-dom";

export const QuestionsContent = (props) => {
  const { selectedItems, setSelectedItems } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { questions } = useSelector((state) => state.questions);

  useEffect(() => {
    if (!questions) {
      dispatch(getQuestionsList());
    }
  }, []);

  const handleDelete = (id) => {
    console.log("Supprimer la ligne avec l'ID :", id);
    dispatch(deleteQuestionsList({ id }));
  };

  const handleEdit = (id) => {
    console.log("Éditer la ligne avec l'ID :", id);
    navigate(`/ModifierQuestion/${id}`);
  };

  const handleView = (id) => {
    console.log("Voir la ligne avec l'ID :", id);
  };

  //        'ennonce_question',
  // 'type',
  // 'reponse_correcte',
  // 'categorie',
  // 'note'
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "ennonce_question", headerName: "Ennonce Question", width: 220 },
    // { field: "reponse_correcte", headerName: "Reponse Correcte", width: 180 },
    {
      field: "type",
      headerName: "Type",
      width: 180,
    },
    { field: "note", headerName: "Note", width: 140 },
    {
      field: "Actions",
      headerName: "Actions",
      sortable: false,
      width: 140,
      renderCell: (params) => (
        <div>
          {selectedItems ? (
            <Checkbox
              checked={selectedItems.some((elt) => elt === params.row.id)}
              onChange={() => {
                setSelectedItems((oldState) => {
                  if (oldState.some((elt) => elt === params.row.id)) {
                    return oldState.filter((elt) => elt !== params.row.id);
                  } else {
                    return [...oldState, params.row.id];
                  }
                });
              }}
            ></Checkbox>
          ) : (
            <>
              <IconButton onClick={() => handleDelete(params.row.id)}>
                <DeleteIcon className="redicon" />
              </IconButton>
              <IconButton onClick={() => handleEdit(params.row.id)}>
                <EditIcon className="greenicon" />
              </IconButton>
              <IconButton onClick={() => handleView(params.row.id)}>
                <VisibilityIcon className="blueicon" />
              </IconButton>
            </>
          )}
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
        <CardContent sx={{ marginLeft: "5rem" }}>
          <h2 className="margintop margin-bottom">Liste des Questions:</h2>
          <DataGrid
            getRowId={(row) => row.id}
            rows={questions || []}
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
