import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, CardContent, Checkbox, IconButton, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";  // Import CloseIcon
import { deleteQuestionsList, getQuestionsList } from "../creerquestion/creerquestionSaga";
import { useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const QuestionsContent = (props) => {
  const { selectedItems, setSelectedItems } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions } = useSelector((state) => state.questions);

  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    if (!questions) {
      dispatch(getQuestionsList());
    }
  }, [dispatch, questions]);

  const handleDelete = (id) => {
    console.log("Supprimer la ligne avec l'ID :", id);
    dispatch(deleteQuestionsList({ id }));
  };

  const handleEdit = (id) => {
    console.log("Éditer la ligne avec l'ID :", id);
    navigate(`/ModifierQuestion/${id}`);
  };

  const handleView = (id) => {
    const question = questions.find((q) => q.id === id);
    setCurrentQuestion(question);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "ennonce_question", headerName: "Ennonce Question", width: 220 },
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
            />
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

<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: "5rem" }}>
<h2 className="margintop margin-bottom">Liste des Questions:</h2>
<Button
  onClick={() => {
    navigate("/CreerQuestions");
  }}
  sx={{ color: "white", bgcolor: "#1976d2", marginLeft: "auto" ,marginBottom:"2rem"}}
  >
  Créer Quetion
</Button>
</Box>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          {currentQuestion && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {currentQuestion.ennonce_question}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Proposed Answers:</strong>
                <ul>
                  {currentQuestion.reponse_propose.map((reponse, index) => (
                    <li
                      key={index}
                      style={
                        currentQuestion.reponse_correcte.some(
                          (correctReponse) => correctReponse.value === reponse.value
                        )
                          ? { color: 'red' }
                          : {}
                      }
                    >
                      {reponse.value}
                    </li>
                  ))}
                </ul>
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};
