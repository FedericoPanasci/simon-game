import styled from "styled-components";

const ContainerComponent = styled.div<{ darkMode: boolean }>`
  width: 80%;
  margin: 20px auto;
  padding: 20px 25px;
  border-radius: 15px;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 🎨 Fondo según tema */
  background: ${(p) => (p.darkMode ? "#0d1117" : "#e9f2ff")};

  /* 🎨 Borde suave según tema */
  border: ${(p) =>
    p.darkMode ? "3px solid #1a2332" : "3px solid #d0e4ff"};

  /* ✨ Glow */
  box-shadow: ${(p) =>
    p.darkMode
      ? "0 0 25px 8px rgba(30, 60, 110, 0.5)"
      : "0 0 25px 8px rgba(120, 170, 255, 0.5)"};

  /* Texto */
  color: ${(p) => (p.darkMode ? "#fff" : "#1a1a1a")};
  font-family: "Press Start 2P", sans-serif;

  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    text-align: center;
  }

  ul {
    list-style: none;
    padding-left: 0;
    width: 100%;
    max-width: 500px;
  }

  li {
    margin-bottom: 12px;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.5;

    /* 🎮 Tarjetitas estilo arcade */
    background: ${(p) =>
      p.darkMode ? "#161b22" : "#ffffffee"};

    border: ${(p) =>
      p.darkMode ? "1px solid #30363d" : "1px solid #cbd9f5"};

    transition: 0.2s ease;

    /* Hover vibrante */
    &:hover {
      background: ${(p) =>
        p.darkMode ? "#21262d" : "#f1f7ff"};
      transform: scale(1.02);
    }
  }
`;

export default ContainerComponent;
