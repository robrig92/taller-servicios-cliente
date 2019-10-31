import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { storeCliente, getClientes } from '../../actions/clientesActions';
import { getEmpresas } from '../../actions/empresaActions';
import FormHeader from '../Forms/FormHeader';

const validate = (values) => {
    let errors = {};

    if (!Validation.required(values.nombreContacto)) {
        errors.nombreContacto = Validation.requiredError()
    } else if (!Validation.stringMax(values.nombreContacto, 255)) {
        errors.nombreContacto = Validation.stringMaxError(255);
    }

    if (!Validation.required(values.telefono)) {
        errors.telefono = Validation.requiredError()
    } else if (!Validation.stringMax(values.telefono, 100)) {
        errors.telefono = Validation.stringMaxError(100);
    }

    if (!Validation.required(values.email)) {
        errors.email = Validation.requiredError()
    } else if (!Validation.stringMax(values.email, 100)) {
        errors.email = Validation.stringMaxError(100);
    }

    if (!Validation.stringMax(values.direccion, 191)) {
        errors.direccion = Validation.stringMaxError(191);
    }

    if (!Validation.stringMax(values.nombreComercial, 120)) {
        errors.nombreComercial = Validation.stringMaxError(120);
    }

    return errors;
}

class ClientesNewForm extends Component {
    componentDidMount() {
        const { getEmpresas } = this.props;

        getEmpresas();
    }

    onSubmit = (data) => {
        const { 
            storeCliente,
            requestStatus,
            reset,
            auth
        } = this.props;
        
        data = {
            ...data,
            usuarioCreador: auth.user.id
        };

        storeCliente(data).then(() => {
            if (requestStatus === 'success') {
                reset();
            }
        });
    }

    handleCancelClick = (e) => {
        const { app, appUpdate, getClientes } = this.props;

        getClientes();
        appUpdate({
            ...app, 
            section: 'start'
        });
    }

    render() { 
        let { requestStatus, empresa } = this.props;

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
                                    title="Clientes / Nuevo"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="nombreContacto"
                                        label="Contacto" 
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
                                        name="nombreComercial"
                                        label="Nombre Comercial" 
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
                                        name="empresa_id"
                                        label="Empresa" 
                                        isRequired={false}
                                        component={RenderField}
                                        type="select"
                                        optionItems={
                                            empresa.items.map( empresa => (
                                                <option key={empresa.id} value={empresa.id}>
                                                    {empresa.nombre}
                                                </option>
                                            ))
                                        }
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
        requestStatus: state.cliente.requestStatus,
        empresa: state.empresa,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        storeCliente: (cliente) => {
            return dispatch(storeCliente(cliente));
        },
        getClientes: () => {
            dispatch(getClientes());
        },
        reset: () => {
            dispatch(reset('clientesNewForm'));
        },
        getEmpresas: () => {
            dispatch(getEmpresas());
        }
    }
}

ClientesNewForm = reduxForm({
    form: 'clientesNewForm',
    validate
})(ClientesNewForm);

ClientesNewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientesNewForm);

export default ClientesNewForm;