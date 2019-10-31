import React, { Component } from 'react';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faEdit
} from '@fortawesome/free-solid-svg-icons';

class RolesGridRow extends Component {
    render() { 
        const { usuario, index, handleEditClick } = this.props;
        
        return (
            <tr onClick={(e) => {handleEditClick(index)}}>
                <th scope="row">{usuario.id}</th>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol.nombre}</td>
                <td>
                    <button onClick={(e) => {handleEditClick(index)}} className="btn btn-info" title="Editar">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                </td>
            </tr>
        );
    }
}
 
export default RolesGridRow;