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

  const colors = ['red', 'green', 'yellow', 'blue']

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

  const comprobarGame = useCallback(() => {
    if (playerColor[playerColor.length - 1] !== comColor[playerColor.length - 1]) {
      const audio = new Audio(`/sound/error.wav`);
      audio.play();
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
        <button onClick={() => playGame()} disabled={buttonInciar}>Iniciar</button>
        <button onClick={() => isDarkMode()}>Tema de fondo</button>
      </div>
      <div className="button-container" style={{ backgroundColor: darkMode ? 'black' : 'white', borderRadius: '20%', width: '310px', height: '310px', marginTop: '10px', padding:'10px'}}>
        <button className='button red' onClick={() => handleClick('red')} style={{backgroundColor: buttonColor === 'red' && isClicked ? '#FF0000' : '#8A3B3B'}} disabled={buttonColorDisable}></button>
        <button className='button green' onClick={() => handleClick('green')} style={{backgroundColor: buttonColor === 'green' && isClicked ? '#00FF00' : '#5EAB5E'}} disabled={buttonColorDisable}></button>
        <button className='button yellow' onClick={() => handleClick('yellow')} style={{backgroundColor: buttonColor === 'yellow' && isClicked ? '#FFFF00' : '#B4B43B'}} disabled={buttonColorDisable}></button>
        <button className='button blue' onClick={() => handleClick('blue')} style={{backgroundColor: buttonColor === 'blue' && isClicked ? '#00BFFF' : '#3A70A5'}} disabled={buttonColorDisable}></button>
      </div>
      
      <div>
        <p style={{ width: '300px', display:'flex', justifyContent: 'center', alignItems: 'center', justifyItems: 'center', margin:'auto'}}>
          Reglamento: para iniciar el juego hay que hacer click en Iniciar. Cada nivel se agrega 1 color a la secuencia, para pasar al siguiente nivel deberas completar la secuencia SIN ERRORES. En caso de equivocarte volveras al principio y deberas apretar en Iniciar para volver a empezar.
        </p>
      </div>
    </div>
  );
}

export default App;
