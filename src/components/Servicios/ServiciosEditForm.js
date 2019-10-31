import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { getServicios, getServicio, updateServicio, deleteServicio } from '../../actions/servicioActions';
import swal from 'sweetalert2';
import FormHeader from '../Forms/FormHeader';

const validate = (values) => {
    let errors = {};

    if (!Validation.required(values.descripcion)) {
        errors.descripcion = Validation.requiredError()
    } else if (!Validation.stringMax(values.descripcion, 255)) {
        errors.descripcion = Validation.stringMaxError(255);
    }

    if (!Validation.required(values.precio)) {
        errors.precio = Validation.requiredError()
    }

    if (!Validation.required(values.tiempoPromedio)) {
        errors.tiempoPromedio = Validation.requiredError()
    }

    return errors;
}

class ServiciosEditForm extends Component {
    componentWillMount() {
        const { getServicio, servicio } = this.props;

        getServicio(servicio.id);
    }

    onSubmit = (data) => {
        const { updateServicio, servicio } = this.props;

        updateServicio({
            ...servicio,
            ...data
        });
    }

    handleCancelClick = (e) => {
        const { app, appUpdate, getServicios } = this.props;

        getServicios();
        appUpdate({
            ...app, 
            section: 'start'
        });
    }

    handleBorrarClick = (e) => {
        let { servicio, deleteServicio } = this.props;

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
                    deleteServicio(servicio.id).then(() => {
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
                                    title="Servicios / Editar"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="descripcion"
                                        label="Servicio" 
                                        isRequired={true}
                                        component={RenderField}
                                        type="text"
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="precio"
                                        label="Precio" 
                                        isRequired={true}
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
                                        name="tiempoPromedio"
                                        label="Tiempo Promedio(horas)" 
                                        isRequired={true}
                                        component={RenderField}
                                        type="number"
                                        className="form-control"/>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="observaciones"
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
        servicio: state.servicio.current,
        initialValues: state.servicio.current,
        requestStatus: state.servicio.requestStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        updateServicio: (servicio) => {
            return dispatch(updateServicio(servicio));
        },
        getServicios: () => {
            dispatch(getServicios());
        },
        getServicio: (id) => {
            return dispatch(getServicio(id));
        },
        deleteServicio: (id) => {
            return dispatch(deleteServicio(id));
        }
    }
}

ServiciosEditForm = reduxForm({
    form: 'serviciosEditForm',
    enableReinitialize: true,
    validate
})(ServiciosEditForm);

ServiciosEditForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiciosEditForm);

export default ServiciosEditForm;