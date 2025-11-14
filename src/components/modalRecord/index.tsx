/* eslint-disable @typescript-eslint/no-unused-vars */
import Modal from 'react-modal';
import customStyles from './style.ts';

function ModalRecord({ showModal, isAriaHide, onRequestClose, playerName, record, handleSubmit, handlePlayerName }: any
  ) {
    let subtitle: HTMLHeadingElement | null;

    return (
        <Modal
        isOpen={showModal}
        ariaHideApp={isAriaHide}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={onRequestClose}
          style={{
            backgroundColor: "#FF5454",
            marginLeft: "18.3rem",
            border: "0px none #FF5454",
            borderRadius: "3px",
            width: "25px",
            height: "25px",
            color: "white",
          }}
        >
          X
        </button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          !Haz llegado a un nuevo record!
        </h2>
        <p>{`Tu secuencia llego al nivel ${record} ¿Queres registrarlo?`}</p>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <input
            type="text"
            value={playerName}
            placeholder="Escribe tu nombre"
            onChange={handlePlayerName}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#1D75BE",
              border: "0px none #1D75BE",
              borderRadius: "3px",
              color: "white",
            }}
          >
            Registrar
          </button>
        </form>
      </Modal>
    );
}

export default ModalRecord;