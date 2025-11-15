import styled from "styled-components";

const CenterButtonStyle = styled.button<{ darkMode: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  font-size: 22px;
  font-weight: bold;
  z-index: 1;
  cursor: pointer;
  transition: all 0.3s ease;

  /* 🎨 Estilos dependiendo del modo */
  background-color: ${(p) =>
    p.darkMode ? "#b200ff" : "#ffffff"};
  
  border: ${(p) =>
    p.darkMode ? "10px solid #a401eb" : "10px solid #c7ddff"};

  color: ${(p) =>
    p.darkMode ? "#ffffff" : "#1a1a1a"};

  &:hover {
    background-color: ${(p) =>
      p.darkMode ? "#d03fff" : "#f4f9ff"};
    box-shadow: ${(p) =>
      p.darkMode
        ? "0 0 20px rgba(208, 63, 255, 0.8)"
        : "0 0 20px rgba(150, 200, 255, 0.8)"};
  }

  &:disabled {
    cursor: default;
    background-color: ${(p) =>
      p.darkMode ? "#666" : "#ddd"};
    border-color: ${(p) =>
      p.darkMode ? "#555" : "#ccc"};
    color: ${(p) =>
      p.darkMode ? "#222" : "#888"};
  }
`;

interface CenterButtonProps {
  comColorLength: number;
  levelCount: number;
  buttonIniciar: boolean;
  onPlayGame: () => void;
  darkMode: boolean;
}

function CenterButton({ comColorLength, levelCount, buttonIniciar, onPlayGame, darkMode }: CenterButtonProps) {
  return (
    <CenterButtonStyle
      onClick={onPlayGame}
      disabled={buttonIniciar}
      darkMode={darkMode}
    >
      {comColorLength > 0 ? `Nivel ${levelCount}` : "START"}
    </CenterButtonStyle>
  );
}

export default CenterButton;