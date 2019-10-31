import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appUpdate } from '../../actions/appActions';
import UsuarioNewForm from './UsuariosNewForm';
import { 
    getUsuarios, 
    usuarioSetCurrent,
    usuarioSetMeta
} from '../../actions/usuarioActions';
import UsuarioGridRow from './UsuariosGridRow';
import UsuarioEditForm from './UsuariosEditForm';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';

class UsuarioGrid extends Component {
    componentDidMount() {
        const { app, appUpdate, getUsuarios } = this.props;

        appUpdate({
            ...app, 
            section: ''
        });
        getUsuarios();
    }

    handleNuevoClick = (e) => {
        const { 
            app, 
            appUpdate, 
            usuario, 
            usuarioSetMeta 
        } = this.props;

        appUpdate({
            ...app,
            section: 'new'
        });
        
        usuarioSetMeta({
            ...usuario.meta,
            imagePerfilSelected: "Seleccione un archivo...",
            currentFileSelected: undefined
        })

    }

    handleEditClick = (index) => {
        const { appUpdate, app, usuarioSetCurrent, usuario } = this.props;

        usuarioSetCurrent(usuario.items[index]);
        appUpdate({
            ...app,
            section: 'update'
        });
    }

    render() { 
        const { app, usuario } = this.props;

        if (usuario.requestStatus === 'error') {
            return 'Error al acceder a la base de datos';
        }

        if (app.section === 'new') {
            return <UsuarioNewForm />
        }

        if (app.section === 'update') {
            return <UsuarioEditForm />
        }

        if (usuario.requestStatus === 'loading') {
            return null;
        }

        return (
            <div className="UsuarioGrid mt-2">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Usuarios</h1>
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
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuario.items.map((usuario, index) => {
                                    return (
                                        <UsuarioGridRow 
                                            key={usuario.id}
                                            index={index} 
                                            usuario={usuario} 
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
        usuario: state.usuario 
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        getUsuarios: () => {
            dispatch(getUsuarios());
        },
        usuarioSetCurrent: (usuario) => {
            dispatch(usuarioSetCurrent(usuario));
        },
        usuarioSetMeta: (meta) => {
            dispatch(usuarioSetMeta(meta));
        }
    }
}

UsuarioGrid = connect(
    mapStateToProps,
    mapDispatchToProps
)(UsuarioGrid);

export default UsuarioGrid;