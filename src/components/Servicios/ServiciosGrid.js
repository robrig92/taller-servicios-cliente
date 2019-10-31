import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appUpdate } from '../../actions/appActions';
import ServiciosNewForm from './ServiciosNewForm';
import { getServicios, servicioSetCurrent } from '../../actions/servicioActions';
import ServiciosGridRow from './ServiciosGridRow';
import ServiciosEditForm from './ServiciosEditForm';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';

class ServiciosGrid extends Component {
    componentDidMount() {
        const { app, appUpdate, getServicios } = this.props;

        appUpdate({
            ...app, 
            section: ''
        });
        getServicios();
    }

    handleNuevoClick = (e) => {
        const { app, appUpdate } = this.props;

        appUpdate({
            ...app,
            section: 'new'
        });
    }

    handleEditClick = (index) => {
        const { appUpdate, app, servicioSetCurrent, servicio } = this.props;

        servicioSetCurrent(servicio.items[index]);
        appUpdate({
            ...app,
            section: 'update'
        });
    }

    render() { 
        const { app, servicio } = this.props;

        if (servicio.requestStatus === 'error') {
            return 'Error al acceder a la base de datos';
        }

        if (app.section === 'new') {
            return <ServiciosNewForm />
        }

        if (app.section === 'update') {
            return <ServiciosEditForm />
        }

        if (servicio.requestStatus === 'loading') {
            return null;
        }

        return (
            <div className="ServiciosGrid mt-2">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Servicios</h1>
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
                                    <th scope="col">Servicio</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Tiempo(horas)</th>
                                    <th scope="col">Observaciones</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicio.items.map((servicio, index) => {
                                    return (
                                        <ServiciosGridRow 
                                            key={servicio.id}
                                            index={index} 
                                            servicio={servicio} 
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
        servicio: state.servicio 
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        getServicios: () => {
            dispatch(getServicios());
        },
        servicioSetCurrent: (servicio) => {
            dispatch(servicioSetCurrent(servicio));
        }
    }
}

ServiciosGrid = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiciosGrid);

export default ServiciosGrid;