import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Modal from 'react-modal';

function App() {
  const [playerColor, setPlayerColor] = useState([]);
  const [comColor, setComColor] = useState([]);
  const [buttonColor, setButtonColor] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [buttonInciar, setButtonIniciar] = useState(false);
  const [buttonColorDisable, setButtonColorDisable] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [levelCount, setLevelCount] = useState(true);
  const [record, setRecord] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const colors = ['red', 'green', 'yellow', 'blue'];
  const [tableRecord, setTableRecord] = useState([]);
  
  let subtitle;
  
  const colorsDefault = ['#8A3B3B', '#5EAB5E', '#B4B43B', '#3A70A5'];
  const colorsClicked = ['#FF0000', '#00FF00', '#FFFF00', '#00BFFF'];
  const [buttonColors, setButtonColors] = useState({
    red: '#8A3B3B',
    green: '#5EAB5E',
    yellow: '#B4B43B',
    blue: '#3A70A5'
  });

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
      if (comColor.length > record) {
        setRecord(comColor.length)
        setShowModal(true);
      }
      flashColors(3);
      setButtonIniciar(false);
      setButtonColorDisable(true);
      setComColor([])
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

  function closeModal() {
    setShowModal(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const handlePlayerName = (e) => {
    setPlayerName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableRecord([{name:playerName, score:record}, ...tableRecord])
    closeModal();
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
          <li>En cada nivel, se agregará un nuevo color a la secuencia anterior.</li>
          <li>Para avanzar al siguiente nivel, completa la secuencia sin cometer errores.</li>
          <li>Si te equivocas, volverás al principio del juego y deberás hacer clic en "Iniciar" para comenzar nuevamente.</li>
        </ul>  
      </div>
      <div>
      <Modal
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} style={{ backgroundColor:'#FF5454', marginLeft:'18.3rem', border:'0px none #FF5454', borderRadius:'3px', width:'25px', height:'25px', color:'white'}}>X</button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>!Haz llegado a un nuevo record!</h2>
        <p>
          {`Tu secuencia llego al nivel ${record} ¿Queres registrarlo?`}
        </p>
        <form onSubmit={handleSubmit} style={{display:'flex', justifyContent:'space-evenly'}}>
          <input type='text' value={playerName} placeholder='Escribe tu nombre' onChange={handlePlayerName}/>
          <button type='submit' style={{backgroundColor:'#1D75BE', border:'0px none #1D75BE', borderRadius:'3px', color:'white'}}>Registrar</button>
        </form>
      </Modal>
      </div>
      {tableRecord.length > 0 && <div>
        <h1>Tabla de records</h1>
        <table style={{margin:'auto'}}>
          <thead>
            <tr>
              <th scope="col">Jugador</th>
              <th scope="col">Nivel</th>
            </tr>
          </thead>
          <tbody>
            {
              tableRecord.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      }
    </div>
  );
}

export default App;
