import React, { Component } from 'react';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faEdit
} from '@fortawesome/free-solid-svg-icons';

class RolesGridRow extends Component {
    render() { 
        const { empresa, index, handleEditClick } = this.props;
        
        return (
            <tr onClick={(e) => {handleEditClick(index)}}>
                <th scope="row">{empresa.id}</th>
                <td>{empresa.nombre}</td>
                <td>{empresa.telefono}</td>
                <td>{empresa.email}</td>
                <td>{empresa.direccion}</td>
                <td>{empresa.razonSocial}</td>
                <td>
                    <button onClick={(e) => {handleEditClick(index)}} className="btn btn-" title="Editar">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </td>
            </tr>
        );
    }
}
 
export default RolesGridRow;