import styled from "styled-components";

const buttonColors: { [key: string]: string } = {
  red: "#8A3B3B",
  green: "#5EAB5E",
  yellow: "#B4B43B",
  blue: "#3A70A5",
};

const colorsClicked: { [key: string]: string } = {
  red: "#FF0000",
  green: "#00FF00",
  yellow: "#FFFF00",
  blue: "#00BFFF",
};

const buttonStyle = styled.button<{ color: string; disabled: boolean, isClicked: boolean }>`
  background-color: ${(props) =>
    // buttonColors[props.color]};
    props.isClicked ? colorsClicked[props.color] : buttonColors[props.color]};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

export default buttonStyle;
