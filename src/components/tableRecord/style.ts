import styled from "styled-components";

const DivContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
  color: white;

  h1 {
    font-size: 28px;
    margin-bottom: 16px;
    color: #00a8ff;
    text-shadow: 0 0 10px rgba(0, 168, 255, 0.8);
  }

  table {
    margin: auto;
    border-collapse: collapse;
    width: 360px;
    border-radius: 12px;
    overflow: hidden;
    background-color: #1b1b1b;
    box-shadow: 0 0 20px rgba(0, 168, 255, 0.25);
  }

  thead {
    background: linear-gradient(90deg, #00a8ff, #0077cc);
    color: white;
    font-size: 18px; /* MÁS GRANDE */
    letter-spacing: 1px;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
  }

  th, td {
    padding: 16px; /* MÁS ESPACIO */
    text-align: center;
    border-bottom: 1px solid #2a2a2a;
    font-size: 17px; /* MÁS GRANDE */
  }

  tbody tr {
    background-color: #242424;
    transition: 0.25s ease;
  }

  tbody tr:nth-child(even) {
    background-color: #2c2c2c;
  }

  tbody tr:hover {
    background-color: #F9E800; /* HOVER AMARILLO EXPLOSIVO */
    color: #000;
    text-shadow: 0 0 6px rgba(0,0,0,0.4);
    transform: scale(1.03);
    box-shadow: 0 0 18px rgba(249, 232, 0, 0.9);
    cursor: default;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

export default DivContainer;
