type Color = "red" | "green" | "yellow" | "blue";

interface ColorButtonProps {
  color: Color;
  buttonColorDisable: boolean;
  backgroundColor: string;
  handleClick: (color: Color) => void;
}

function ColorButton({ color, buttonColorDisable, backgroundColor, handleClick }: ColorButtonProps) {
  return (
    <button
      className={`button button-${color}`}
      onClick={() => handleClick(color)}
      disabled={buttonColorDisable}
      style={{
        backgroundColor: backgroundColor,
        cursor: buttonColorDisable ? "default" : "pointer",
      }}
    />
  );
}

export default ColorButton;