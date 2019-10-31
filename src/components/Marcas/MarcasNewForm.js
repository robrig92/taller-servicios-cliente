import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { storeMarca, getMarcas } from '../../actions/marcaActions';
import FormHeader from '../Forms/FormHeader';

const validate = (values) => {
    let errors = {};

    if (!Validation.required(values.marca)) {
        errors.marca = Validation.requiredError()
    } else if (!Validation.stringMax(values.marca, 255)) {
        errors.marca = Validation.stringMaxError(255);
    }

    return errors;
}

class MarcasNewForm extends Component {
    onSubmit = (data) => {
        const {
            storeMarca,
            requestStatus,
            reset,
            auth
        } = this.props;

        data = {
            ...data,
            usuarioCreador: auth.user.id
        }

        storeMarca(data).then(() => {
            if (requestStatus === 'success') {
                reset();
            }
        });
    }

    handleCancelClick = (e) => {
        const { app, appUpdate, getMarcas } = this.props;

        getMarcas();
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
                                    title="Marcas / Nuevo"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="marca"
                                        label="Marca" 
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
        requestStatus: state.marca.requestStatus,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        storeMarca: (marca) => {
            return dispatch(storeMarca(marca));
        },
        getMarcas: () => {
            dispatch(getMarcas());
        },
        reset: () => {
            dispatch(reset('marcasNewForm'));
        }
    }
}

MarcasNewForm = reduxForm({
    form: 'marcasNewForm',
    validate
})(MarcasNewForm);

MarcasNewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(MarcasNewForm);

export default MarcasNewForm;