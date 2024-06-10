import React, { useEffect } from "react";
import "./inscription.css";
import Tabs from "../tabs/Tabs";
import InscriptionCandidat from "../inscriptioncondidat/inscriptionCondidat";
import InscriptionFormateur from "../inscriptionformateur/InscriptionFormateur";
import inscription from "../../assets/inscription.jpg";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Inscription = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  const tabs = [
    {
      id: 1,
      name: "Candidat",
      content: <InscriptionCandidat setOpen={setOpen} />,
    },
    {
      id: 2,
      name: "Formateur",
      content: <InscriptionFormateur setOpen={setOpen} />,
    },
  ];

  return (
    <div className="multibox">
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          navigate("/connexion");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Vous avez été enregistré avec succès !
          </Typography>
          <Button
            style={{ marginTop: "2rem" }}
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => {
              setOpen(false);
              navigate("/connexion");
            }}
          >
            Fermer
          </Button>
        </Box>
      </Modal>
      <div className="leftBox">
        <img src={inscription} className="leftimg" />
      </div>

      <div className="righttBox ">
        <div className=" flex">
          <h1>Inscription</h1>
        </div>
        <div>
          <h3 className="subtitle"></h3>
        </div>
        <div className="top-distance">
          <p className="paragraph">
            Inscrivez-vous et rejoinredre notre plateforme
          </p>
        </div>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default Inscription;
