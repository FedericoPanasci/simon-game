import { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [playerColor, setPlayerColor] = useState([]);
  const [comColor, setComColor] = useState([]);
  const [buttonColor, setButtonColor] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [buttonInciar, setButtonIniciar] = useState(false);
  const [buttonColorDisable, setButtonColorDisable] = useState(true);

  const colors = ['red', 'green', 'yellow', 'blue']

  const handleClick = ((color) => {
    setButtonColor(color);
    setIsClicked(true);
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
    if (buttonInciar) {
      addComColor();
    }
  }, [buttonInciar])

  useEffect(() => {
    if (comColor.length > 0) {
      showSequence();
    }
  }, [comColor])

  const showSequence = () => {
    let index = 0;
    const interval = setInterval(() => {
        setButtonColor(comColor[index]);
        setIsClicked(true);
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
  }

  const comprobarGame = useCallback(() => {
    if (playerColor[playerColor.length - 1] !== comColor[playerColor.length - 1]) {
      alert("Las secuencias son diferentes. ¡PERDISTE! Haz click en Iniciar para volver a jugar.");
      setComColor([])
      setPlayerColor([])
      return;
  } else {
    if (playerColor.length === comColor.length) {
      alert("Las secuencias son iguales. ¡Haz click en iniciar para el siguiente nivel!");
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
    // setButtonIniciar(!buttonInciar);
    comSequence();
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => playGame()} disabled={buttonInciar}>Iniciar</button>
      </div>
      <div>
        <button className='red' onClick={() => handleClick('red')} style={{backgroundColor: buttonColor === 'red' && isClicked ? 'lightcoral' : 'darkred'}} disabled={buttonColorDisable}>{colors[0]}</button>
        <button className='green' onClick={() => handleClick('green')} style={{backgroundColor: buttonColor === 'green' && isClicked ? 'lightgreen' : 'darkgreen'}} disabled={buttonColorDisable}>{colors[1]}</button>
        <button className='yellow' onClick={() => handleClick('yellow')} style={{backgroundColor: buttonColor === 'yellow' && isClicked ? 'lightyellow' : 'darkgoldenrod'}} disabled={buttonColorDisable}>{colors[2]}</button>
        <button className='blue' onClick={() => handleClick('blue')} style={{backgroundColor: buttonColor === 'blue' && isClicked ? 'lightblue' : 'darkblue'}} disabled={buttonColorDisable}>{colors[3].toString()}</button>
      </div>
    </div>
  );
}

export default App;
