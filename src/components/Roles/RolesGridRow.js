import React, { Component } from 'react';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faEdit
} from '@fortawesome/free-solid-svg-icons';

class RolesGridRow extends Component {
    render() { 
        const { rol, index, handleEditClick } = this.props;
        
        return (
            <tr onClick={(e) => {handleEditClick(index)}}>
                <th scope="row">{rol.id}</th>
                <td>{rol.nombre}</td>
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