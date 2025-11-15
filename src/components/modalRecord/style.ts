import styled from "styled-components";

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;

  background-color: #ff4d4d;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;

  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;

  box-shadow: 0 0 8px rgba(255, 77, 77, 0.6);

  transition: 0.2s ease;

  &:hover {
    background-color: #ff2e2e;
    box-shadow: 0 0 12px rgba(255, 46, 46, 0.9);
  }
`;

export const ModalForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
`;

export const ModalInput = styled.input`
  padding: 10px 12px;
  border: 2px solid #1d75be;
  border-radius: 8px;

  outline: none;
  font-size: 15px;

  transition: 0.2s ease;

  &:focus {
    border-color: #2e8ceb;
    box-shadow: 0 0 8px rgba(46, 140, 235, 0.7);
  }
`;

export const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  text-align: center;
`;

export const SubmitButton = styled.button`
  background-color: #1d75be;
  border: none;

  padding: 6px 12px;
  border-radius: 6px;
  color: white;
  font-size: 13px;
  font-weight: 500;

  cursor: pointer;
  transition: 0.2s ease;

  box-shadow: 0 0 8px rgba(29, 117, 190, 0.6);

  &:hover {
    background-color: #155a9b;
    box-shadow: 0 0 12px rgba(29, 117, 190, 0.8);
  }
`;

export const CancelButton = styled.button`
  background-color: #ff4d4d;
  border: none;

  padding: 6px 12px;
  border-radius: 6px;
  color: white;
  font-size: 13px;
  font-weight: 500;

  cursor: pointer;
  transition: 0.2s ease;

  box-shadow: 0 0 8px rgba(255, 77, 77, 0.6);

  &:hover {
    background-color: #ff2e2e;
    box-shadow: 0 0 12px rgba(255, 46, 46, 0.9);
  }
`;

export const customStyles = {
  overlay: {
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1001,
    borderRadius: "16px",
    padding: "10px",
    boxShadow: "0 0 20px rgba(0,0,0,0.6)",
    border: "none",
  },
};
