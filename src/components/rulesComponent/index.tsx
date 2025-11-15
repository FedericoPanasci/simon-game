import ContainerComponent from './style.ts';

interface RulesComponentProps {
  darkMode: boolean;
}

function RulesComponent({ darkMode }: RulesComponentProps) {
    return (
        <ContainerComponent darkMode={darkMode}>
        <h2>Reglamento del Juego:</h2>
        <ul>
          <li>Haz clic en "Iniciar" para comenzar el juego.</li>
          <li>
            En cada nivel, se agregará un nuevo color a la secuencia anterior.
          </li>
          <li>
            Para avanzar al siguiente nivel, completa la secuencia sin cometer
            errores.
          </li>
          <li>
            Si te equivocas, volverás al principio del juego y deberás hacer
            clic en "Iniciar" para comenzar nuevamente.
          </li>
        </ul>
      </ContainerComponent>
    );
}

export default RulesComponent;