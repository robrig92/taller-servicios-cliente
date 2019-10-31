import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { storeEmpresa, getEmpresas } from '../../actions/empresaActions';
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

class EmpresasNewForm extends Component {
    onSubmit = (data) => {
        const {
            storeEmpresa,
            requestStatus,
            reset,
            auth
        } = this.props;

        data = {
            ...data,
            usuarioCreador: auth.user.id
        }

        storeEmpresa(data).then(() => {
            if (requestStatus === 'success') {
                reset();
            }
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

    render() { 
        let { requestStatus } = this.props;

        if (requestStatus === 'loading') {
            return <div>Insertando...</div>
        }

        return (
            <div className="row">
                <div className="col-12">
                    <form onSubmit={this.props.handleSubmit((data) => this.onSubmit(data))}>
                        <div className="row">
                            <div className="col-12">
                                <FormHeader 
                                    title="Empresas / Nuevo"/>
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
                                <button className="btn btn-info" type="submit">Guardar</button>
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
        requestStatus: state.empresa.requestStatus,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        storeEmpresa: (empresa) => {
            return dispatch(storeEmpresa(empresa));
        },
        getEmpresas: () => {
            dispatch(getEmpresas());
        },
        reset: () => {
            dispatch(reset('empresasNewForm'));
        }
    }
}

EmpresasNewForm = reduxForm({
    form: 'empresasNewForm',
    validate
})(EmpresasNewForm);

EmpresasNewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(EmpresasNewForm);

export default EmpresasNewForm;