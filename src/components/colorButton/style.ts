import styled from "styled-components";

const buttonStyle = styled.button<{ color: string; backgroundColor: string; disabled: boolean; isActive: boolean }>`
  width: 150px;
  height: 150px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  border: none;
  background-color: ${props => props.backgroundColor};
  
  border-radius: ${props => {
    switch(props.color) {
      case 'red': return '50% 10% 10% 10%';
      case 'green': return '10% 50% 10% 10%';
      case 'yellow': return '10% 10% 10% 50%';
      case 'blue': return '10% 10% 50% 10%';
      default: return '10%';
    }
  }};
  
  box-shadow: ${props => {
    if (!props.isActive) return 'none';
    switch(props.color) {
      case 'red': return '0 0 20px 5px rgba(255, 0, 0, 0.8)';
      case 'green': return '0 0 20px 5px rgba(0, 255, 0, 0.8)';
      case 'yellow': return '0 0 20px 5px rgba(255, 255, 0, 0.8)';
      case 'blue': return '0 0 20px 5px rgba(0, 191, 255, 0.8)';
      default: return 'none';
    }
  }};
`;

export default buttonStyle;
