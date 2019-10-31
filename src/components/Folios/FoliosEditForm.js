import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { getFolios, getFolio, updateFolio, deleteFolio } from '../../actions/folioActions';
import { getClientes } from '../../actions/clientesActions';
import { getTipoEquipos } from '../../actions/tipoEquipoActions';
import { getMarcas } from '../../actions/marcaActions';
import { getServicios } from '../../actions/servicioActions';
import { getUsuarios } from '../../actions/usuarioActions';
import { getEstatusAll } from '../../actions/estatusActions';
import Constants from '../../Constants';
import swal from 'sweetalert2';
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

    if (!Validation.required(values.folio_id)) {
        errors.folio_id = Validation.requiredError();
    }

    if (!Validation.required(values.servicio_id)) {
        errors.servicio_id = Validation.requiredError();
    }

    if (!Validation.required(values.tipoEquipo_id)) {
        errors.tipoEquipo_id = Validation.requiredError();
    }

    if (!Validation.required(values.estatus_id)) {
        errors.estatus_id = Validation.requiredError();
    }


    return errors;
}

class FoliosEditForm extends Component {
    componentDidMount() {
        const {
            getMarcas,
            getClientes,
            getUsuarios,
            getServicios,
            getEstatusAll,
            getTipoEquipos
        } = this.props;

        getMarcas();
        getClientes();
        getUsuarios();
        getServicios();
        getEstatusAll();
        getTipoEquipos();
    }

    componentWillMount() {
        const { getFolio, folio } = this.props;

        getFolio(folio.id);
    }

    onSubmit = (data) => {
        const { updateFolio, folio } = this.props;

        updateFolio({
            ...folio,
            ...data
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

    handleBorrarClick = (e) => {
        let { folio, deleteFolio } = this.props;

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
                    deleteFolio(folio.id).then(() => {
                        this.handleCancelClick(e);
                    });
                }
            });

    }

    render() { 
        let { 
            requestStatus, 
            cliente,
            tipoEquipo,
            marca,
            estatus,
            usuario,
            servicio,
            folio
        } = this.props;

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
                                    title="Folios / Editar"/>
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
                                        isDisabled={parseInt(folio.estatus_id) === Constants.Estatus.finalizado || parseInt(folio.estatus_id) === Constants.Estatus.finalizado ? true : false}
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
                                        isDisabled={parseInt(folio.estatus_id) === Constants.Estatus.finalizado || parseInt(folio.estatus_id) === Constants.Estatus.finalizado ? true : false}
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
                                        isDisabled={parseInt(folio.estatus_id) === Constants.Estatus.finalizado || parseInt(folio.estatus_id) === Constants.Estatus.finalizado ? true : false}
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
                                        isDisabled={parseInt(folio.estatus_id) === Constants.Estatus.finalizado || parseInt(folio.estatus_id) === Constants.Estatus.finalizado ? true : false}
                                        type="text"
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="form-goup">
                                    <Field
                                        name="estatus_id"
                                        label="Estatus" 
                                        isRequired={true}
                                        component={RenderField}
                                        isDisabled={parseInt(folio.estatus_id) === Constants.Estatus.finalizado || parseInt(folio.estatus_id) === Constants.Estatus.finalizado ? true : false}
                                        type="select"
                                        optionItems={
                                            estatus.items.map( estatus => (
                                                <option key={estatus.id} value={estatus.id}>
                                                    {estatus.estatus}
                                                </option>
                                            ))
                                        }
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-goup">
                                    <Field
                                        name="servicio_id"
                                        label="Servicio" 
                                        isRequired={true}
                                        component={RenderField}
                                        isDisabled={parseInt(folio.estatus_id) === Constants.Estatus.finalizado || parseInt(folio.estatus_id) === Constants.Estatus.finalizado ? true : false}
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
                            <div className="col-4">
                                <div className="form-goup">
                                    <Field
                                        name="asignadoA"
                                        label="Asignar A" 
                                        isRequired={false}
                                        component={RenderField}
                                        isDisabled={parseInt(folio.estatus_id) === Constants.Estatus.finalizado || parseInt(folio.estatus_id) === Constants.Estatus.finalizado ? true : false}
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
                                        isDisabled={parseInt(folio.estatus_id) === Constants.Estatus.finalizado || parseInt(folio.estatus_id) === Constants.Estatus.finalizado ? true : false}
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
                                        isDisabled={parseInt(folio.estatus_id) === Constants.Estatus.finalizado || parseInt(folio.estatus_id) === Constants.Estatus.finalizado ? true : false}
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
                                        isDisabled={parseInt(folio.estatus_id) === Constants.Estatus.finalizado || parseInt(folio.estatus_id) === Constants.Estatus.finalizado ? true : false}
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
                                        isDisabled={parseInt(folio.estatus_id) === Constants.Estatus.finalizado || parseInt(folio.estatus_id) === Constants.Estatus.finalizado ? true : false}
                                        type="textarea"
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <button 
                                    className="btn btn-info" 
                                    type="button" 
                                    onClick={e => this.handleCancelClick(e)}>Regresar
                                </button>{' '}
                                {parseInt(folio.estatus_id) !== Constants.Estatus.finalizado && parseInt(folio.estatus_id) !== Constants.Estatus.cancelado &&
                                    <button 
                                        className="btn btn-info" 
                                        type="submit">Guardar
                                    </button>
                                }
                                {' '}
                                {parseInt(folio.estatus_id) !== Constants.Estatus.finalizado && parseInt(folio.estatus_id) !== Constants.Estatus.cancelado && 
                                    <button 
                                        className="btn btn-info" 
                                        type="button" 
                                        onClick={e => this.handleBorrarClick(e)}>Borrar
                                    </button>
                                }
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
        folio: state.folio.current,
        cliente: state.cliente,
        tipoEquipo: state.tipoEquipo,
        marca: state.marca,
        servicio: state.servicio,
        estatus: state.estatus,
        usuario: state.usuario,
        initialValues: state.folio.current,
        requestStatus: state.folio.requestStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        updateFolio: (folio) => {
            return dispatch(updateFolio(folio));
        },
        getFolios: () => {
            dispatch(getFolios());
        },
        getFolio: (id) => {
            return dispatch(getFolio(id));
        },
        deleteFolio: (id) => {
            return dispatch(deleteFolio(id));
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
        },
        getEstatusAll: () => {
            dispatch(getEstatusAll());
        }
    }
}

FoliosEditForm = reduxForm({
    form: 'foliosEditForm',
    enableReinitialize: true,
    validate
})(FoliosEditForm);

FoliosEditForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(FoliosEditForm);

export default FoliosEditForm;