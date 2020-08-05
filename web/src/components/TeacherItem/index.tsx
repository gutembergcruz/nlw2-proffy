import React from "react";

import "./styles.css";

import whastappIcon from "../../assets/images/icons/whatsapp.svg";

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars0.githubusercontent.com/u/31583703?s=460&u=39fcc83732de56a95e5a198c1beed327be4bf427&v=4"
          alt="Gutemberg Cruz"
        />

        <div>
          <strong>Gutemberg Cruz</strong>
          <span>Física Quântica</span>
        </div>
      </header>
      <p>
        Autodidata Esforçado pra garai
        <br /> <br />
        Dev Fron-End e UI Designer
        <br /> <br />
        Apaixonado por Meu filho
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 75,00</strong>
        </p>
        <button type="button">
          <img src={whastappIcon} alt="whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;
