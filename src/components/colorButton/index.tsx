import ButtonStyle from './style.ts';
type Color = "red" | "green" | "yellow" | "blue";

interface ColorButtonProps {
  color: Color;
  buttonColorDisable: boolean;
  backgroundColor: string;
  handleClick: (color: Color) => void;
}

function ColorButton({ color, buttonColorDisable, backgroundColor, handleClick }: ColorButtonProps) {
  const defaultColors = { red: '#6E1F1F', green: '#2E6B2E', yellow: '#7F7F24', blue: '#1E4B70' };
  const isActive = backgroundColor !== defaultColors[color];
  
  return (
    <ButtonStyle
      color={color}
      backgroundColor={backgroundColor}
      disabled={buttonColorDisable}
      isActive={isActive}
      onClick={() => handleClick(color)}
    />
  );
}

export default ColorButton;