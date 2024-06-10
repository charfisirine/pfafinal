import React, { useState } from "react";
import "./inscriptionrformateur.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InscriptionFormateur = (props) => {
  const {setOpen} =props
  const [formData, setFormData] = useState({
    nom_complet: "",
    email: "",
    adresse: "",
    phone: "",
    password: "",
    secteur_activite: "",
    nom_entreprise: "",
    site_web: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear errors associated with the modified field
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/formateur/register",
        formData
      
      );
      console.log(response.data);
      setOpen(true); // Redirect to the login page
    } catch (error) {
      console.error(error.response.data);
      if (error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="ligne-form">
          <div className="form-item-double">
            <div className="form-group form-item">
              <label className="label" htmlFor="name">
                Nom & Prénom
              </label>
              <input
                type="text"
                className="form-control"
                id="nom_complet"
                placeholder="Nom & Prénom"
                onChange={handleChange}
              />
              {errors.name && (
                <span className="error-message">{errors.name[0]}</span>
              )}
            </div>
            <div className="form-group form-item">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-message">{errors.email[0]}</span>
              )}
            </div>
          </div>
        </div>

        <div className="ligne-form">
          <div className="form-item-double">
            <div className="form-group form-item">
              <label className="label" htmlFor="secteur_activite">
                Secteur d'activité
              </label>
              <input
                type="text"
                className="form-control"
                id="secteur_activite"
                placeholder="Secteur d'activité"
                onChange={handleChange}
              />
              {errors.secteur_activite && (
                <span className="error-message">
                  {errors.secteur_activite[0]}
                </span>
              )}
            </div>
            <div className="form-group form-item">
              <label className="label" htmlFor="adresse">
                Adresse
              </label>
              <input
                type="text"
                className="form-control"
                id="adresse"
                placeholder="Adresse"
                onChange={handleChange}
              />
              {errors.adresse && (
                <span className="error-message">{errors.adresse[0]}</span>
              )}
            </div>
          </div>
        </div>

        <div className="ligne-form">
          <div className="form-item-double">
            <div className="form-group form-item">
              <label className="label" htmlFor="nom_entreprise">
                Nom de l'entreprise
              </label>
              <input
                type="text"
                className="form-control"
                id="nom_entreprise"
                placeholder="Nom de l'entreprise"
                onChange={handleChange}
              />
              {errors.nom_entreprise && (
                <span className="error-message">
                  {errors.nom_entreprise[0]}
                </span>
              )}
            </div>
            <div className="form-group form-item">
              <label className="label" htmlFor="site_web">
                Site Web
              </label>
              <input
                type="text"
                className="form-control"
                id="site_web"
                placeholder="Site Web"
                onChange={handleChange}
              />
              {errors.site_web && (
                <span className="error-message">{errors.site_web[0]}</span>
              )}
            </div>
          </div>
        </div>

        <div className="ligne-form">
          <div className="form-item-double">
            <div className="form-group form-item">
              <label className="label" htmlFor="phone">
                Numéro de téléphone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Numéro de téléphone"
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone[0]}</span>
              )}
            </div>
            <div className="form-group form-item">
              <label className="label" htmlFor="password">
                Mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Mot de passe"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error-message">{errors.password[0]}</span>
              )}
            </div>
          </div>
        </div>

        <div className="ligne-form">
          <div className="inscrire top-distance">
            <button type="submit" className="btn-inscrire">
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InscriptionFormateur;
