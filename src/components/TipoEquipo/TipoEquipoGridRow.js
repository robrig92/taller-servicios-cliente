import React, { Component } from 'react';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faEdit
} from '@fortawesome/free-solid-svg-icons';

class TipoEquipoGridRow extends Component {
    render() { 
        const { tipoEquipo, index, handleEditClick } = this.props;
        
        return (
            <tr onClick={(e) => {handleEditClick(index)}}>
                <th scope="row">{tipoEquipo.id}</th>
                <td>{tipoEquipo.tipo}</td>
                <td>
                    <button onClick={(e) => {handleEditClick(index)}} className="btn btn-info" title="Editar">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </td>
            </tr>
        );
    }
}
 
export default TipoEquipoGridRow;