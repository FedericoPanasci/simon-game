import ITableRecord from '../../interface/ITableRecord';
import DivContainer from './style';

interface TableRecordProps {
  tableRecord: ITableRecord[];
}

function TableRecord({ tableRecord }: TableRecordProps) {
    return (
        <DivContainer>
          <h1>Tabla de records</h1>
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">Jugador</th>
                <th scope="col">Nivel</th>
              </tr>
            </thead>
            <tbody>
              {tableRecord.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DivContainer>
    );
}

export default TableRecord;