import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appUpdate } from '../../actions/appActions';
import ClientesNewForm from './ClientesNewForm';
import { getClientes, clienteSetCurrent } from '../../actions/clientesActions';
import ClientesGridRow from './ClientesGridRow';
import ClientesEditForm from './ClientesEditForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';

class ClientesGrid extends Component {
    componentDidMount() {
        const { app, appUpdate, getClientes } = this.props;

        appUpdate({
            ...app, 
            section: ''
        });
        getClientes();
    }

    handleNuevoClick = (e) => {
        const { app, appUpdate } = this.props;

        appUpdate({
            ...app,
            section: 'new'
        });
    }

    handleEditClick = (index) => {
        const { appUpdate, app, clienteSetCurrent, cliente } = this.props;

        clienteSetCurrent(cliente.items[index]);
        appUpdate({
            ...app,
            section: 'update'
        });
    }

    render() { 
        const { app, cliente } = this.props;

        if (cliente.requestStatus === 'error') {
            return 'Error al acceder a la base de datos';
        }

        if (app.section === 'new') {
            return <ClientesNewForm />
        }

        if (app.section === 'update') {
            return <ClientesEditForm />
        }

        if (cliente.requestStatus === 'loading') {
            return null;
        }

        return (
            <div className="ClientesGrid mt-2">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Clientes</h1>
                    </div>
                    <div className="col-sm-6">
                        <div className="float-right">
                            <button 
                                className="btn btn-info" 
                                type="button"
                                onClick={(e) => this.handleNuevoClick(e)}>
                                <FontAwesomeIcon icon={faPlus} /> {' '} Nuevo
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Contacto</th>
                                    <th scope="col">Empresa</th>
                                    <th scope="col">Nombre Comercial</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cliente.items.map((cliente, index) => {
                                    return (
                                        <ClientesGridRow 
                                            key={cliente.id}
                                            index={index} 
                                            cliente={cliente} 
                                            handleEditClick={this.handleEditClick}/>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        cliente: state.cliente 
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        getClientes: () => {
            dispatch(getClientes());
        },
        clienteSetCurrent: (cliente) => {
            dispatch(clienteSetCurrent(cliente));
        }
    }
}

ClientesGrid = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientesGrid);

export default ClientesGrid;