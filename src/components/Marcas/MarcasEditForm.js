import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { getMarcas, getMarca, updateMarca, deleteMarca } from '../../actions/marcaActions';
import swal from 'sweetalert2';
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

class MarcasEditForm extends Component {
    componentWillMount() {
        const { getMarca, marca } = this.props;

        getMarca(marca.id);
    }

    onSubmit = (data) => {
        const { updateMarca, marca } = this.props;

        updateMarca({
            ...marca,
            ...data
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

    handleBorrarClick = (e) => {
        let { marca, deleteMarca } = this.props;

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
                    deleteMarca(marca.id).then(() => {
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
                                    title="Marcas / Editar"/>
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
        marca: state.marca.current,
        initialValues: state.marca.current,
        requestStatus: state.marca.requestStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        updateMarca: (marca) => {
            return dispatch(updateMarca(marca));
        },
        getMarcas: () => {
            dispatch(getMarcas());
        },
        getMarca: (id) => {
            return dispatch(getMarca(id));
        },
        deleteMarca: (id) => {
            return dispatch(deleteMarca(id));
        }
    }
}

MarcasEditForm = reduxForm({
    form: 'marcasEditForm',
    enableReinitialize: true,
    validate
})(MarcasEditForm);

MarcasEditForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(MarcasEditForm);

export default MarcasEditForm;