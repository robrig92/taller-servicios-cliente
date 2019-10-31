import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { storeServicio, getServicios } from '../../actions/servicioActions';
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

class ServiciosNewForm extends Component {
    onSubmit = (data) => {
        const {
            storeServicio,
            requestStatus,
            reset,
            auth
        } = this.props;

        data = {
            ...data,
            usuarioCreador: auth.user.id
        }

        storeServicio(data).then(() => {
            if (requestStatus === 'success') {
                reset();
            }
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
                                    title="Servicios / Nuevo"/>
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
        requestStatus: state.servicio.requestStatus,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        storeServicio: (servicio) => {
            return dispatch(storeServicio(servicio));
        },
        getServicios: () => {
            dispatch(getServicios());
        },
        reset: () => {
            dispatch(reset('serviciosNewForm'));
        }
    }
}

ServiciosNewForm = reduxForm({
    form: 'serviciosNewForm',
    validate
})(ServiciosNewForm);

ServiciosNewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiciosNewForm);

export default ServiciosNewForm;