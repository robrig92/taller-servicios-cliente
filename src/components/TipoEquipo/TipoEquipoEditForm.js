import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { getTipoEquipos, getTipoEquipo, updateTipoEquipo, deleteTipoEquipo } from '../../actions/tipoEquipoActions';
import swal from 'sweetalert2';
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

class TipoEquipoEditForm extends Component {
    componentWillMount() {
        const { getTipoEquipo, tipoEquipo } = this.props;

        getTipoEquipo(tipoEquipo.hashId);
    }

    onSubmit = (data) => {
        const { updateTipoEquipo, tipoEquipo } = this.props;

        updateTipoEquipo({
            ...tipoEquipo,
            ...data
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

    handleBorrarClick = (e) => {
        let { tipoEquipo, deleteTipoEquipo } = this.props;

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
                    deleteTipoEquipo(tipoEquipo.hashId).then(() => {
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
                                    title="Tipo Equipo / Editar"/>
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
        tipoEquipo: state.tipoEquipo.current,
        initialValues: state.tipoEquipo.current,
        requestStatus: state.tipoEquipo.requestStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        updateTipoEquipo: (tipoEquipo) => {
            return dispatch(updateTipoEquipo(tipoEquipo));
        },
        getTipoEquipos: () => {
            dispatch(getTipoEquipos());
        },
        getTipoEquipo: (id) => {
            return dispatch(getTipoEquipo(id));
        },
        deleteTipoEquipo: (id) => {
            return dispatch(deleteTipoEquipo(id));
        }
    }
}

TipoEquipoEditForm = reduxForm({
    form: 'tipoEquipoEditForm',
    enableReinitialize: true,
    validate
})(TipoEquipoEditForm);

TipoEquipoEditForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(TipoEquipoEditForm);

export default TipoEquipoEditForm;