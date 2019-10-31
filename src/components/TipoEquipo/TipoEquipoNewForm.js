import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { storeTipoEquipo, getTipoEquipos } from '../../actions/tipoEquipoActions';
import FormHeader from '../Forms/FormHeader';

const validate = (values) => {
    let errors = {};

    if (!Validation.required(values.tipo)) {
        errors.tipo = Validation.requiredError()
    } else if (!Validation.stringMax(values.tipo, 255)) {
        errors.tipo = Validation.stringMaxError(255);
    }

    return errors;
}

class TipoEquipoNewForm extends Component {
    onSubmit = (data) => {
        const {
            storeTipoEquipo,
            requestStatus,
            reset,
            auth
        } = this.props;

        data = {
            ...data,
            usuarioCreador: auth.user.id
        }

        storeTipoEquipo(data).then(() => {
            if (requestStatus === 'success') {
                reset();
            }
        });
    }

    handleCancelClick = (e) => {
        const { app, appUpdate, getTipoEquipos } = this.props;

        getTipoEquipos();
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
                                    title="Tipo Equipo / Nuevo"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="tipo"
                                        label="Tipo Equipo" 
                                        isRequired={true}
                                        component={RenderField}
                                        type="text"
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
        requestStatus: state.tipoEquipo.requestStatus,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        storeTipoEquipo: (tipoEquipo) => {
            return dispatch(storeTipoEquipo(tipoEquipo));
        },
        getTipoEquipos: () => {
            dispatch(getTipoEquipos());
        },
        reset: () => {
            dispatch(reset('tipoEquipoNewForm'));
        }
    }
}

TipoEquipoNewForm = reduxForm({
    form: 'tipoEquipoNewForm',
    validate
})(TipoEquipoNewForm);

TipoEquipoNewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(TipoEquipoNewForm);

export default TipoEquipoNewForm;