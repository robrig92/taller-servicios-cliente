import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { getEmpresas, getEmpresa, updateEmpresa, deleteEmpresa } from '../../actions/empresaActions';
import swal from 'sweetalert2';
import FormHeader from '../Forms/FormHeader';

const validate = (values) => {
    let errors = {};

    if (!Validation.required(values.nombre)) {
        errors.nombre = Validation.requiredError()
    } else if (!Validation.stringMax(values.nombre, 255)) {
        errors.nombre = Validation.stringMaxError(255);
    }

    return errors;
}

class EmpresasEditForm extends Component {
    componentWillMount() {
        const { getEmpresa, empresa } = this.props;

        getEmpresa(empresa.id);
    }

    onSubmit = (data) => {
        const { updateEmpresa, empresa } = this.props;

        updateEmpresa({
            ...empresa,
            ...data
        });
    }

    handleCancelClick = (e) => {
        const { app, appUpdate, getEmpresas } = this.props;

        getEmpresas();
        appUpdate({
            ...app, 
            section: 'start'
        });
    }

    handleBorrarClick = (e) => {
        let { empresa, deleteEmpresa } = this.props;

        swal({
            title: '¿Estás seguro?',
            text: "¡No podrá ser revertido!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Borrar'
            }).then((result) => {
                if (result.value) {
                    deleteEmpresa(empresa.id).then(() => {
                        this.handleCancelClick(e);
                    });
                }
            });

    }

    render() { 
        let { requestStatus } = this.props;

        if (requestStatus === 'loading') {
            return <div>Actualizando...</div>
        }

        return (
            <div className="row">
                <div className="col-12">
                    <form onSubmit={this.props.handleSubmit((data) => this.onSubmit(data))}>
                        <div className="row">
                            <div className="col-12">
                                <FormHeader 
                                    title="Empresas / Editar"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="nombre"
                                        label="Nombre" 
                                        isRequired={true}
                                        component={RenderField}
                                        type="text"
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="razonSocial"
                                        label="Razón Social" 
                                        isRequired={false}
                                        component={RenderField}
                                        type="text"
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="direccion"
                                        label="Dirección" 
                                        isRequired={false}
                                        component={RenderField}
                                        type="text"
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="telefono"
                                        label="Teléfono" 
                                        isRequired={true}
                                        component={RenderField}
                                        type="text"
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="email"
                                        label="E-mail" 
                                        isRequired={true}
                                        component={RenderField}
                                        type="email"
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <button className="btn btn-info" type="button" onClick={e => this.handleCancelClick(e)}>Regresar</button>{' '}
                                <button className="btn btn-info" type="submit">Guardar</button>{' '}
                                <button className="btn btn-info" type="button" onClick={e => this.handleBorrarClick(e)}>Borrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        empresa: state.empresa.current,
        initialValues: state.empresa.current,
        requestStatus: state.empresa.requestStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        updateEmpresa: (empresa) => {
            return dispatch(updateEmpresa(empresa));
        },
        getEmpresas: () => {
            dispatch(getEmpresas());
        },
        getEmpresa: (id) => {
            return dispatch(getEmpresa(id));
        },
        deleteEmpresa: (id) => {
            return dispatch(deleteEmpresa(id));
        }
    }
}

EmpresasEditForm = reduxForm({
    form: 'empresasEditForm',
    enableReinitialize: true,
    validate
})(EmpresasEditForm);

EmpresasEditForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmpresasEditForm);

export default EmpresasEditForm;