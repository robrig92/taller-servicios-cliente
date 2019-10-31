import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appUpdate } from '../../actions/appActions';
import FoliosNewForm from './FoliosNewForm';
import { getFolios, folioSetCurrent } from '../../actions/folioActions';
import FoliosGridRow from './FoliosGridRow';
import FoliosEditForm from './FoliosEditForm';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';

class FoliosGrid extends Component {
    componentDidMount() {
        const { app, appUpdate, getFolios } = this.props;

        appUpdate({
            ...app, 
            section: ''
        });
        getFolios();
    }

    handleNuevoClick = (e) => {
        const { app, appUpdate } = this.props;

        appUpdate({
            ...app,
            section: 'new'
        });
    }

    handleEditClick = (index) => {
        const { appUpdate, app, folioSetCurrent, folio } = this.props;

        folioSetCurrent(folio.items[index]);
        appUpdate({
            ...app,
            section: 'update'
        });
    }

    render() { 
        const { app, folio } = this.props;

        if (folio.requestStatus === 'error') {
            return 'Error al acceder a la base de datos';
        }

        if (app.section === 'new') {
            return <FoliosNewForm />
        }

        if (app.section === 'update') {
            return <FoliosEditForm />
        }

        if (folio.requestStatus === 'loading') {
            return null;
        }

        return (
            <div className="FoliosGrid mt-2">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Folios</h1>
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
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Servicio</th>
                                    <th scope="col">Asignado</th>
                                    <th scope="col">Estatus</th>
                                    <th scope="col">Equipo</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Observaciones</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {folio.items.map((folio, index) => {
                                    return (
                                        <FoliosGridRow 
                                            key={folio.id}
                                            index={index} 
                                            folio={folio} 
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
        folio: state.folio 
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        getFolios: () => {
            dispatch(getFolios());
        },
        folioSetCurrent: (folio) => {
            dispatch(folioSetCurrent(folio));
        }
    }
}

FoliosGrid = connect(
    mapStateToProps,
    mapDispatchToProps
)(FoliosGrid);

export default FoliosGrid;