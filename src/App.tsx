/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import TableRecordComponent from "./components/tableRecord/index.tsx";
import ITableRecord from "./interface/ITableRecord";
import ModalRecord from "./components/modalRecord/index.tsx";
import RulesComponent from "./components/rulesComponent/index.tsx";
import ColorButton from "./components/colorButton/index.tsx";

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
    }, (comColor.length) * 700);
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
      <div>
        <button className="button-tema" onClick={() => isDarkMode()}>
          Tema de fondo
        </button>
      </div>
      <div>
        {comColor.length > 0 ? (
          <p
            className="button-iniciar"
            style={{ cursor: "default" }}
          >{`Nivel ${levelCount}`}</p>
        ) : (
          <button
            className="button-iniciar"
            onClick={() => playGame()}
            disabled={buttonInciar}
          >
            Iniciar
          </button>
        )}
      </div>
      <div
        className="button-container"
        style={{
          backgroundColor: darkMode ? "black" : "white",
          borderRadius: "25%",
          width: "310px",
          height: "310px",
          marginTop: "10px",
          padding: "10px",
        }}
      >
        {colors.map((color) => {
          const isActive = buttonColor === color && isClicked;
          const activeColor = color === "red" ? "#FF0000" : 
                             color === "green" ? "#00FF00" : 
                             color === "yellow" ? "#FFFF00" : "#00BFFF";
          
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
      </div>
      <RulesComponent />
      <ModalRecord
        showModal={showModal}
        isAriaHide={false}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
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
