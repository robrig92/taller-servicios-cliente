import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { storeFolio, getFolios } from '../../actions/folioActions';
import { getClientes } from '../../actions/clientesActions';
import { getTipoEquipos } from '../../actions/tipoEquipoActions';
import { getMarcas } from '../../actions/marcaActions';
import { getServicios } from '../../actions/servicioActions';
import { getUsuarios } from '../../actions/usuarioActions';

import FormHeader from '../Forms/FormHeader';

const validate = (values) => {
    let errors = {};

    if (!Validation.required(values.numeroSerie)) {
        errors.numeroSerie = Validation.requiredError()
    } else if (!Validation.stringMax(values.numeroSerie, 255)) {
        errors.numeroSerie = Validation.stringMaxError(255);
    }

    if (!Validation.stringMax(values.diagnostico, 6500)) {
        errors.diagnostico = Validation.stringMaxError(6500);
    }

    if (!Validation.stringMax(values.observacion, 255)) {
        errors.observacion = Validation.stringMaxError(255);
    }

    if (!Validation.required(values.marca_id)) {
        errors.marca_id = Validation.requiredError();
    }

    if (!Validation.required(values.cliente_id)) {
        errors.cliente_id = Validation.requiredError();
    }

    if (!Validation.required(values.servicio_id)) {
        errors.servicio_id = Validation.requiredError();
    }

    if (!Validation.required(values.tipoEquipo_id)) {
        errors.tipoEquipo_id = Validation.requiredError();
    }

    return errors;
}

class FoliosNewForm extends Component {
    componentDidMount() {
        const { 
            getMarcas,
            getClientes,
            getUsuarios,
            getServicios,
            getTipoEquipos
        } = this.props;

        getMarcas();
        getClientes();
        getUsuarios();
        getServicios();
        getTipoEquipos();
    }

    onSubmit = (data) => {
        const {
            storeFolio,
            requestStatus,
            reset,
            auth
        } = this.props;

        data = {
            ...data,
            usuarioCreador: auth.user.id
        };

        storeFolio(data).then(() => {
            if (requestStatus === 'success') {
                reset();
            }
        });
    }

    handleCancelClick = (e) => {
        const { app, appUpdate, getFolios } = this.props;

        getFolios();
        appUpdate({
            ...app, 
            section: 'start'
        });
    }

    render() { 
        let { 
            requestStatus, 
            cliente, 
            tipoEquipo,
            marca,
            usuario,
            servicio
        } = this.props;

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
                                    title="Folios / Nuevo"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="cliente_id"
                                        label="Cliente" 
                                        isRequired={true}
                                        component={RenderField}
                                        type="select"
                                        optionItems={
                                            cliente.items.map( cliente => (
                                                <option key={cliente.id} value={cliente.id}>
                                                    {cliente.nombreContacto} {cliente.nombreComercial ? `- ${cliente.nombreComercial}` : ''}
                                                </option>
                                            ))
                                        }
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-goup">
                                    <Field
                                        name="tipoEquipo_id"
                                        label="Equipo" 
                                        isRequired={true}
                                        component={RenderField}
                                        type="select"
                                        optionItems={
                                            tipoEquipo.items.map( tipoEquipo => (
                                                <option key={tipoEquipo.id} value={tipoEquipo.id}>
                                                    {tipoEquipo.tipo}
                                                </option>
                                            ))
                                        }
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-goup">
                                    <Field
                                        name="marca_id"
                                        label="Marca" 
                                        isRequired={true}
                                        component={RenderField}
                                        type="select"
                                        optionItems={
                                            marca.items.map( marca => (
                                                <option key={marca.id} value={marca.id}>
                                                    {marca.marca}
                                                </option>
                                            ))
                                        }
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-goup">
                                    <Field
                                        name="numeroSerie"
                                        label="Número de Serie" 
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
                                        name="servicio_id"
                                        label="Servicio" 
                                        isRequired={true}
                                        component={RenderField}
                                        type="select"
                                        optionItems={
                                            servicio.items.map( servicio => (
                                                <option key={servicio.id} value={servicio.id}>
                                                    {servicio.descripcion}
                                                </option>
                                            ))
                                        }
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="asignadoA"
                                        label="Asignar A" 
                                        isRequired={false}
                                        component={RenderField}
                                        type="select"
                                        optionItems={
                                            usuario.items.map( usuario => (
                                                <option key={usuario.id} value={usuario.id}>
                                                    {usuario.nombre}
                                                </option>
                                            ))
                                        }
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="diagnostico"
                                        label="Diagnóstico" 
                                        isRequired={false}
                                        component={RenderField}
                                        type="textarea"
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-goup">
                                    <Field
                                        name="cotizacion"
                                        label="Cotización" 
                                        isRequired={false}
                                        component={RenderField}
                                        type="number"
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-goup">
                                    <Field
                                        name="total"
                                        label="Total" 
                                        isRequired={false}
                                        component={RenderField}
                                        type="number"
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="observacion"
                                        label="Observaciones" 
                                        isRequired={false}
                                        component={RenderField}
                                        type="textarea"
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
        requestStatus: state.folio.requestStatus,
        cliente: state.cliente,
        tipoEquipo: state.tipoEquipo,
        marca: state.marca,
        servicio: state.servicio,
        usuario: state.usuario,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        storeFolio: (folio) => {
            return dispatch(storeFolio(folio));
        },
        getFolios: () => {
            dispatch(getFolios());
        },
        reset: () => {
            dispatch(reset('foliosNewForm'));
        },
        getClientes: () => {
            dispatch(getClientes());
        },
        getTipoEquipos: () => {
            dispatch(getTipoEquipos());
        },
        getMarcas: () => {
            dispatch(getMarcas());
        },
        getServicios: () => {
            dispatch(getServicios());
        },
        getUsuarios: () => {
            dispatch(getUsuarios());
        }
    }
}

FoliosNewForm = reduxForm({
    form: 'foliosNewForm',
    validate
})(FoliosNewForm);

FoliosNewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(FoliosNewForm);

export default FoliosNewForm;