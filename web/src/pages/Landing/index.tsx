import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import hero from "../../assets/images/landing.svg";
import StudyIcon from "../../assets/images/icons/study.svg";
import GiveClassesIcon from "../../assets/images/icons/give-classes.svg";
import PurpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import "./styles.css";

function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo Proffy" />
          <h2>Sua plataforma de estudos online</h2>
        </div>
        <img src={hero} alt="" className="hero-image" />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={StudyIcon} alt="Estudar" />
            Estudar
          </Link>
          <Link to="give-classes" className="give-classes">
            <img src={GiveClassesIcon} alt="Dar Aulas" />
            Dar aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de 200 conexões já realizadas{" "}
          <img src={PurpleHeartIcon} alt="Ícone de coração" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
