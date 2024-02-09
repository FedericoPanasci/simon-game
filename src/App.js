import { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [playerColor, setPlayerColor] = useState([]);
  const [comColor, setComColor] = useState([]);
  const [buttonColor, setButtonColor] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [buttonInciar, setButtonIniciar] = useState(false);
  const [buttonColorDisable, setButtonColorDisable] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [levelCount, setLevelCount] = useState(true);
  const colors = ['red', 'green', 'yellow', 'blue'];
  
  const colorsDefault = ['#8A3B3B', '#5EAB5E', '#B4B43B', '#3A70A5'];
  const colorsClicked = ['#FF0000', '#00FF00', '#FFFF00', '#00BFFF'];
  const [buttonColors, setButtonColors] = useState({
    red: '#8A3B3B',
    green: '#5EAB5E',
    yellow: '#B4B43B',
    blue: '#3A70A5'
  });
  const colorLose = 'white';

  const playSound = (color) => {
    const audio = new Audio(`/sound/audio-${color}.mp3`);
    audio.play();
  };

  const handleClick = ((color) => {
    setButtonColor(color);
    setIsClicked(true);
    playSound(color);
    setPlayerColor([...playerColor, color]);
    setTimeout(() => {
      setIsClicked(false);
      setButtonColor('');
    }, 300);
  });
  
  useEffect(() => {
    if (playerColor.length > 0) {
      comprobarGame();
  }
  }, [playerColor])

  const addComColor = () => {
    const newColor = Math.floor(Math.random() * colors.length);
    setComColor([...comColor, colors[newColor]]);
  }

  useEffect(() => {
    setLevelCount(comColor.length);
    if (comColor.length > 0) {
      showSequence();
    }
  }, [comColor])

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
        setButtonColor('');
        index++;
        if (index >= comColor.length) {
          clearInterval(interval);
          setTimeout(() => {
            setButtonColorDisable(false);
          }, 1000);
        }
      }, 300);
    }, 1000);
  })

  const flashColors = (count) => {
    if (count === 0) return;
    setButtonColors({
      red: colorsClicked[0],
      green: colorsClicked[1],
      yellow: colorsClicked[2],
      blue: colorsClicked[3]
    });
      setTimeout(() => {
      setButtonColors({
        red: colorsDefault[0],
        green: colorsDefault[1],
        yellow: colorsDefault[2],
        blue: colorsDefault[3]
      });
      setTimeout(() => {
        flashColors(count - 1); 
      }, 500); 
    }, 500); 
  };

  const comprobarGame = useCallback(() => {
    if (playerColor[playerColor.length - 1] !== comColor[playerColor.length - 1]) {
      const audio = new Audio(`/sound/error.wav`);
      audio.play();
      flashColors(3);
      setButtonIniciar(false);
      setButtonColorDisable(true);
      setComColor([])
      return;
  } else {
    if (playerColor.length === comColor.length) {
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
  }, [playerColor, comColor])

  const comSequence = () => {
    setPlayerColor([]);
    setButtonColorDisable(true);
    addComColor();
    showSequence();
    setTimeout(() => {
      setButtonColorDisable(false);
  }, (comColor.length + 1) * 1000);
  }

  const playGame = () => {
    setButtonIniciar(true);
    comSequence();
  }

  const isDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div className="App">
      <div>
        <button className='button-tema' onClick={() => isDarkMode()}>Tema de fondo</button>
      </div>
      <div>
        {
          comColor.length > 0 ?
          <p className='button-iniciar' style={{ cursor: 'default'}}>{`Nivel ${levelCount}`}</p> : 
          <button className='button-iniciar' onClick={() => playGame()} disabled={buttonInciar}>Iniciar</button>
        }
      </div>
      <div className="button-container" style={{ backgroundColor: darkMode ? 'black' : 'white', borderRadius: '20%', width: '310px', height: '310px', marginTop: '10px', padding:'10px'}}>
        <button className='button red' onClick={() => handleClick('red')} style={{backgroundColor: buttonColor === 'red' && isClicked ? '#FF0000' : buttonColors.red, cursor: buttonColorDisable && 'default'}} disabled={buttonColorDisable}></button>
        <button className='button green' onClick={() => handleClick('green')} style={{backgroundColor: buttonColor === 'green' && isClicked ? '#00FF00' : buttonColors.green, cursor: buttonColorDisable && 'default'}} disabled={buttonColorDisable}></button>
        <button className='button yellow' onClick={() => handleClick('yellow')} style={{backgroundColor: buttonColor === 'yellow' && isClicked ? '#FFFF00' : buttonColors.yellow, cursor: buttonColorDisable && 'default'}} disabled={buttonColorDisable}></button>
        <button className='button blue' onClick={() => handleClick('blue')} style={{backgroundColor: buttonColor === 'blue' && isClicked ? '#00BFFF' : buttonColors.blue, cursor: buttonColorDisable && 'default'}} disabled={buttonColorDisable}></button>
      </div>
      <div style={{ width: '300px', justifyContent: 'center', alignItems: 'center', justifyItems: 'center', margin:'auto'}}>
        <h2 >
          Reglamento del Juego:
        </h2>
        <ul style={{ justifyContent:'center', textAlign:'justify', marginLeft:'-25px'}}>
          <li>Haz clic en "Iniciar" para comenzar el juego.</li>
          <li>En cada nivel, se agregará un nuevo color a la secuencia.</li>
          <li>Para avanzar al siguiente nivel, completa la secuencia sin cometer errores.</li>
          <li>Si te equivocas, volverás al principio del juego y deberás hacer clic en "Iniciar" para comenzar de nuevo.</li>
        </ul>  
      </div>
    </div>
  );
}

export default App;
