import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appUpdate } from '../../actions/appActions';
import MarcasNewForm from './MarcasNewForm';
import { getMarcas, marcaSetCurrent } from '../../actions/marcaActions';
import MarcasGridRow from './MarcasGridRow';
import MarcasEditForm from './MarcasEditForm';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';

class MarcasGrid extends Component {
    componentDidMount() {
        const { app, appUpdate, getMarcas } = this.props;

        appUpdate({
            ...app, 
            section: ''
        });
        getMarcas();
    }

    handleNuevoClick = (e) => {
        const { app, appUpdate } = this.props;

        appUpdate({
            ...app,
            section: 'new'
        });
    }

    handleEditClick = (index) => {
        const { appUpdate, app, marcaSetCurrent, marca } = this.props;

        marcaSetCurrent(marca.items[index]);
        appUpdate({
            ...app,
            section: 'update'
        });
    }

    render() { 
        const { app, marca } = this.props;

        if (marca.requestStatus === 'error') {
            return 'Error al acceder a la base de datos';
        }

        if (app.section === 'new') {
            return <MarcasNewForm />
        }

        if (app.section === 'update') {
            return <MarcasEditForm />
        }

        if (marca.requestStatus === 'loading') {
            return null;
        }

        return (
            <div className="MarcasGrid mt-2">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Marcas</h1>
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
                                    <th scope="col">Marca</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marca.items.map((marca, index) => {
                                    return (
                                        <MarcasGridRow 
                                            key={marca.id}
                                            index={index} 
                                            marca={marca} 
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
        marca: state.marca 
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        getMarcas: () => {
            dispatch(getMarcas());
        },
        marcaSetCurrent: (marca) => {
            dispatch(marcaSetCurrent(marca));
        }
    }
}

MarcasGrid = connect(
    mapStateToProps,
    mapDispatchToProps
)(MarcasGrid);

export default MarcasGrid;