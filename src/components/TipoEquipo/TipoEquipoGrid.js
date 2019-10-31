import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appUpdate } from '../../actions/appActions';
import TipoEquipoNewForm from './TipoEquipoNewForm';
import { getTipoEquipos, tipoEquipoSetCurrent } from '../../actions/tipoEquipoActions';
import TipoEquipoGridRow from './TipoEquipoGridRow';
import TipoEquipoEditForm from './TipoEquipoEditForm';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';

class TipoEquipoGrid extends Component {
    componentDidMount() {
        const { app, appUpdate, getTipoEquipos } = this.props;

        appUpdate({
            ...app, 
            section: ''
        });
        getTipoEquipos();
    }

    handleNuevoClick = (e) => {
        const { app, appUpdate } = this.props;

        appUpdate({
            ...app,
            section: 'new'
        });
    }

    handleEditClick = (index) => {
        const { appUpdate, app, tipoEquipoSetCurrent, tipoEquipo } = this.props;

        tipoEquipoSetCurrent(tipoEquipo.items[index]);
        appUpdate({
            ...app,
            section: 'update'
        });
    }

    render() { 
        const { app, tipoEquipo } = this.props;

        if (tipoEquipo.requestStatus === 'error') {
            return 'Error al acceder a la base de datos';
        }

        if (app.section === 'new') {
            return <TipoEquipoNewForm />
        }

        if (app.section === 'update') {
            return <TipoEquipoEditForm />
        }

        if (tipoEquipo.requestStatus === 'loading') {
            return null;
        }

        return (
            <div className="TipoEquipoGrid mt-2">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Tipo Equipo</h1>
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
                                {tipoEquipo.items.map((tipoEquipo, index) => {
                                    return (
                                        <TipoEquipoGridRow 
                                            key={tipoEquipo.id}
                                            index={index} 
                                            tipoEquipo={tipoEquipo} 
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
        tipoEquipo: state.tipoEquipo 
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        getTipoEquipos: () => {
            dispatch(getTipoEquipos());
        },
        tipoEquipoSetCurrent: (tipoEquipo) => {
            dispatch(tipoEquipoSetCurrent(tipoEquipo));
        }
    }
}

TipoEquipoGrid = connect(
    mapStateToProps,
    mapDispatchToProps
)(TipoEquipoGrid);

export default TipoEquipoGrid;