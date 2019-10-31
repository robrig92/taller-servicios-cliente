import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appUpdate } from '../../actions/appActions';
import EmpresasNewForm from './EmpresasNewForm';
import { getEmpresas, empresaSetCurrent } from '../../actions/empresaActions';
import EmpresasGridRow from './EmpresasGridRow';
import EmpresasEditForm from './EmpresasEditForm';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';

class EmpresasGrid extends Component {
    componentDidMount() {
        const { app, appUpdate, getEmpresas } = this.props;

        appUpdate({
            ...app, 
            section: ''
        });
        getEmpresas();
    }

    handleNuevoClick = (e) => {
        const { app, appUpdate } = this.props;

        appUpdate({
            ...app,
            section: 'new'
        });
    }

    handleEditClick = (index) => {
        const { appUpdate, app, empresaSetCurrent, empresa } = this.props;

        empresaSetCurrent(empresa.items[index]);
        appUpdate({
            ...app,
            section: 'update'
        });
    }

    render() { 
        const { app, empresa } = this.props;

        if (empresa.requestStatus === 'error') {
            return 'Error al acceder a la base de datos';
        }

        if (app.section === 'new') {
            return <EmpresasNewForm />
        }

        if (app.section === 'update') {
            return <EmpresasEditForm />
        }

        if (empresa.requestStatus === 'loading') {
            return null;
        }

        return (
            <div className="EmpresasGrid mt-2">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Empresas</h1>
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
                                    <th scope="col">Empresa</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Dirección</th>
                                    <th scope="col">Razón Social</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empresa.items.map((empresa, index) => {
                                    return (
                                        <EmpresasGridRow 
                                            key={empresa.id}
                                            index={index} 
                                            empresa={empresa} 
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
        empresa: state.empresa 
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        getEmpresas: () => {
            dispatch(getEmpresas());
        },
        empresaSetCurrent: (empresa) => {
            dispatch(empresaSetCurrent(empresa));
        }
    }
}

EmpresasGrid = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmpresasGrid);

export default EmpresasGrid;