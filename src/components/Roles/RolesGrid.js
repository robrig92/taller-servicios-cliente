import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appUpdate } from '../../actions/appActions';
import RolesNewForm from './RolesNewForm';
import { getRoles, rolSetCurrent } from '../../actions/rolActions';
import RolesGridRow from './RolesGridRow';
import RolesEditForm from './RolesEditForm';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';

class RolesGrid extends Component {
    componentDidMount() {
        const { app, appUpdate, getRoles } = this.props;

        appUpdate({
            ...app, 
            section: ''
        });
        getRoles();
    }

    handleNuevoClick = (e) => {
        const { app, appUpdate } = this.props;

        appUpdate({
            ...app,
            section: 'new'
        });
    }

    handleEditClick = (index) => {
        const { appUpdate, app, rolSetCurrent, rol } = this.props;

        rolSetCurrent(rol.items[index]);
        appUpdate({
            ...app,
            section: 'update'
        });
    }

    render() { 
        const { app, rol } = this.props;

        if (rol.requestStatus === 'error') {
            return 'Error al acceder a la base de datos';
        }

        if (app.section === 'new') {
            return <RolesNewForm />
        }

        if (app.section === 'update') {
            return <RolesEditForm />
        }

        if (rol.requestStatus === 'loading') {
            return null;
        }

        return (
            <div className="RolesGrid mt-2">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Roles</h1>
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
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rol.items.map((rol, index) => {
                                    return (
                                        <RolesGridRow 
                                            key={rol.id}
                                            index={index} 
                                            rol={rol} 
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
        rol: state.rol 
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        getRoles: () => {
            dispatch(getRoles());
        },
        rolSetCurrent: (rol) => {
            dispatch(rolSetCurrent(rol));
        }
    }
}

RolesGrid = connect(
    mapStateToProps,
    mapDispatchToProps
)(RolesGrid);

export default RolesGrid;