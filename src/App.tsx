/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import TableRecordComponent from "./components/tableRecord";
import ITableRecord from "./interface/ITableRecord";
import ModalRecord from "./components/modalRecord";
import RulesComponent from "./components/rulesComponent";
import ColorButton from "./components/colorButton";
import CenterButton from "./components/centerButton";

type Color = "red" | "green" | "yellow" | "blue";

function App() {
  const [playerColor, setPlayerColor] = useState<Color[]>([]);
  const [comColor, setComColor] = useState<Color[]>([]);
  const [buttonColor, setButtonColor] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [buttonInciar, setButtonIniciar] = useState<boolean>(false);
  const [buttonColorDisable, setButtonColorDisable] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [levelCount, setLevelCount] = useState<number>(0);
  const [record, setRecord] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const colors: Color[] = ["red", "green", "yellow", "blue"];
  const [tableRecord, setTableRecord] = useState<ITableRecord[]>([]);

  const colorsDefault = ["#6E1F1F", "#2E6B2E", "#7F7F24", "#1E4B70"];
  const colorsClicked = ["#FF1744", "#00E676", "#FFEB3B", "#00B0FF"];
  const [buttonColors, setButtonColors] = useState({
    red: "#6E1F1F",
    green: "#2E6B2E",
    yellow: "#7F7F24",
    blue: "#1E4B70",
  });

  const playSound = (color: Color) => {
    const audio = new Audio(`/sound/audio-${color}.mp3`);
    audio.play();
  };

  const handleClick = (color: Color) => {
    setButtonColor(color);
    setIsClicked(true);
    playSound(color);
    setPlayerColor([...playerColor, color]);
    setTimeout(() => {
      setIsClicked(false);
      setButtonColor("");
    }, 300);
  };

  useEffect(() => {
    if (playerColor.length > 0) {
      comprobarGame();
    }
  }, [playerColor]);

  const addComColor = () => {
    const newColor = Math.floor(Math.random() * colors.length);
    setComColor([...comColor, colors[newColor]]);
  };

  useEffect(() => {
    setLevelCount(comColor.length);
    if (comColor.length > 0) {
      showSequence();
    }
  }, [comColor]);

  const showSequence = useCallback(() => {
    let index = 0;
    const interval = setInterval(() => {
      setButtonColor(comColor[index]);
      setIsClicked(true);
      if (comColor[index] !== undefined) {
        const audio = new Audio(`/sound/audio-${comColor[index]}.mp3`);
        audio.play();
      }
      setTimeout(() => {
        setIsClicked(false);
        setButtonColor("");
        index++;
        if (index >= comColor.length) {
          clearInterval(interval);
        }
      }, 300);
    }, 500);
  }, [comColor]);

  const flashColors = (count: number) => {
    if (count === 0) return;
    setButtonColors({
      red: colorsClicked[0],
      green: colorsClicked[1],
      yellow: colorsClicked[2],
      blue: colorsClicked[3],
    });
    setTimeout(() => {
      setButtonColors({
        red: colorsDefault[0],
        green: colorsDefault[1],
        yellow: colorsDefault[2],
        blue: colorsDefault[3],
      });
      setTimeout(() => {
        flashColors(count - 1);
      }, 500);
    }, 500);
  };

  const comprobarGame = useCallback(() => {
    if (
      playerColor[playerColor.length - 1] !== comColor[playerColor.length - 1]
    ) {
      const audio = new Audio(`/sound/error.wav`);
      audio.play();
      if (comColor.length > record) {
        setRecord(comColor.length);
        setShowModal(true);
      }
      flashColors(3);
      setButtonIniciar(false);
      setButtonColorDisable(true);
      setComColor([]);
      return;
    } else {
      if (playerColor.length === comColor.length) {
        setButtonColorDisable(true);
        setTimeout(() => {
          const audio = new Audio(`/sound/success.wav`);
          audio.play();
        }, (comColor.length + 1) * 100);
        setTimeout(() => {
          comSequence();
        }, (comColor.length + 1) * 400);
      }
      return;
    }
  }, [playerColor, comColor, record]);

  const comSequence = () => {
    setPlayerColor([]);
    setButtonColorDisable(true);
    addComColor();
    showSequence();
    setTimeout(() => {
      setButtonColorDisable(false);
    }, comColor.length * 700);
  };

  const playGame = () => {
    setButtonIniciar(true);
    comSequence();
  };

  const isDarkMode = () => {
    setDarkMode(!darkMode);
  };

  function closeModal() {
    setShowModal(false);
  }

  const handlePlayerName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTableRecord([{ name: playerName, score: record }, ...tableRecord]);
    closeModal();
  };

  return (
    <div className="App">
      <button
        className={`button-tema ${darkMode ? "dark" : "light"}`}
        onClick={isDarkMode}
      >
        CAMBIAR TEMA
      </button>

      <div
        className="button-container"
        style={{
          // Fondo — ahora usa el violeta del botón "Tema de fondo"
          background: darkMode ? "#6a0dad" : "#e9f2ff",

          borderRadius: "25%",
          width: "310px",
          height: "310px",
          marginTop: "10px",
          padding: "10px",
          position: "relative",

          // Bordes — ajustados al nuevo color base
          border: darkMode ? "3px solid #7c20c0" : "3px solid #d0e4ff",

          // Glow arcade — ajustado a juego con el violeta
          boxShadow: darkMode
            ? "0 0 25px 8px rgba(174, 0, 255, 0.45)" // glow violeta neón
            : "0 0 25px 8px rgba(0, 234, 255, 0.4)", // glow cyan vibrante

          transition: "background 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {colors.map((color) => {
          const isActive = buttonColor === color && isClicked;
          const activeColor =
            color === "red"
              ? "#FF0000"
              : color === "green"
              ? "#00FF00"
              : color === "yellow"
              ? "#FFFF00"
              : "#00BFFF";

          return (
            <ColorButton
              key={color}
              color={color}
              buttonColorDisable={buttonColorDisable}
              backgroundColor={isActive ? activeColor : buttonColors[color]}
              handleClick={handleClick}
            />
          );
        })}
        <CenterButton
          comColorLength={comColor.length}
          levelCount={levelCount}
          buttonIniciar={buttonInciar}
          onPlayGame={playGame}
          darkMode={darkMode}
        />
      </div>
      <RulesComponent darkMode={darkMode} />
      <ModalRecord
        showModal={showModal}
        onRequestClose={closeModal}
        record={record}
        playerName={playerName}
        handlePlayerName={handlePlayerName}
        handleSubmit={handleSubmit}
      />
      {tableRecord.length > 0 && (
        <TableRecordComponent tableRecord={tableRecord} />
      )}
    </div>
  );
}

export default App;
