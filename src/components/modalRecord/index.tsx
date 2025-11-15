/* eslint-disable @typescript-eslint/no-unused-vars */
import Modal from 'react-modal';
import { CloseButton, ModalForm, ModalInput, SubmitButton, CancelButton, ModalTitle, customStyles } from './style';

interface ModalRecordProps {
  showModal: boolean;
  onRequestClose: () => void;
  playerName: string;
  record: number;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePlayerName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ModalRecord({ showModal, onRequestClose, playerName, record, handleSubmit, handlePlayerName }: ModalRecordProps) {
    let subtitle: HTMLHeadingElement | null;

    return (
        <Modal
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <ModalTitle ref={(_subtitle) => { subtitle = _subtitle; }}>
          !Haz llegado a un nuevo record!
        </ModalTitle>
        <p>{`Tu secuencia llego al nivel ${record} ¿Queres registrarlo?`}</p>
        <ModalForm onSubmit={handleSubmit}>
          <ModalInput
            type="text"
            value={playerName}
            placeholder="Escribe tu nombre"
            onChange={handlePlayerName}
          />
          <CancelButton type="button" onClick={onRequestClose}>
            Cancelar
          </CancelButton>
          <SubmitButton type="submit">
            Registrar
          </SubmitButton>
        </ModalForm>
      </Modal>
    );
}

export default ModalRecord;