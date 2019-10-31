import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { getClientes, getCliente, updateCliente, deleteCliente } from '../../actions/clientesActions';
import { getEmpresas } from '../../actions/empresaActions';
import swal from 'sweetalert2';
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

class ClientesEditForm extends Component {
    componentDidMount() {
        const { getEmpresas } = this.props;

        getEmpresas();
    }

    componentWillMount() {
        const { getCliente, cliente } = this.props;

        getCliente(cliente.hashId);
    }

    onSubmit = (data) => {
        const { updateCliente, cliente } = this.props;

        updateCliente({
            ...cliente,
            ...data
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

    handleBorrarClick = (e) => {
        let { cliente, deleteCliente } = this.props;

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
                    deleteCliente(cliente.hashId).then(() => {
                        this.handleCancelClick(e);
                    });
                }
            });

    }

    render() { 
        let { requestStatus, empresa } = this.props;

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
                                    title="Clientes / Editar"/>
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
        cliente: state.cliente.current,
        empresa: state.empresa,
        initialValues: state.cliente.current,
        requestStatus: state.cliente.requestStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        updateCliente: (cliente) => {
            return dispatch(updateCliente(cliente));
        },
        getClientes: () => {
            dispatch(getClientes());
        },
        getCliente: (id) => {
            return dispatch(getCliente(id));
        },
        deleteCliente: (id) => {
            return dispatch(deleteCliente(id));
        },
        getEmpresas: () => {
            dispatch(getEmpresas());
        }
    }
}

ClientesEditForm = reduxForm({
    form: 'clientesEditForm',
    enableReinitialize: true,
    validate
})(ClientesEditForm);

ClientesEditForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientesEditForm);

export default ClientesEditForm;