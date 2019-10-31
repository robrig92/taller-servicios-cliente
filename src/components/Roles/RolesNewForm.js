import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { storeRol, getRoles } from '../../actions/rolActions';
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

class RolesNewForm extends Component {
    onSubmit = (data) => {
        const {
            storeRol,
            requestStatus,
            reset,
            auth
        } = this.props;

        data = {
            ...data,
            usuarioCreador: auth.user.id
        }

        storeRol(data).then(() => {
            if (requestStatus === 'success') {
                reset();
            }
        });
    }

    handleCancelClick = (e) => {
        const { app, appUpdate, getRoles } = this.props;

        getRoles();
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
                                    title="Roles / Nuevo"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="nombre"
                                        label="Rol" 
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
        requestStatus: state.rol.requestStatus,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        storeRol: (rol) => {
            return dispatch(storeRol(rol));
        },
        getRoles: () => {
            dispatch(getRoles());
        },
        reset: () => {
            dispatch(reset('rolesNewForm'));
        }
    }
}

RolesNewForm = reduxForm({
    form: 'rolesNewForm',
    validate
})(RolesNewForm);

RolesNewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(RolesNewForm);

export default RolesNewForm;