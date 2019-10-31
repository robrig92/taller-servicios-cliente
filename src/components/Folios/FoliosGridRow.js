import React, { Component } from 'react';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faEdit
} from '@fortawesome/free-solid-svg-icons';

class RolesGridRow extends Component {
    render() { 
        const { folio, index, handleEditClick } = this.props;
        
        if (folio.activo === '0' || folio.activo === 0) {
            return null;
        }

        return (
            <tr onClick={(e) => {handleEditClick(index)}}>
                <th scope="row">{folio.id}</th>
                <td>{folio.fechaAbre}</td>
                <td>{folio.cliente.nombreComercial}</td>
                <td>{folio.servicio.descripcion}</td>
                <td>{folio.asignado_a ? folio.asignado_a.nombre : ''}</td>
                <td>{folio.estatus.estatus}</td>
                <td>{folio.tipo_equipo.tipo}</td>
                <td>${folio.total}</td>
                <td>{folio.observacion}</td>
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