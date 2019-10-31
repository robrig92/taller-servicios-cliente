import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';

import { getRoles } from '../../actions/rolActions';
import { appUpdate } from '../../actions/appActions';
import { 
    storeUsuario,
    getUsuarios,
    usuarioSetMeta 
} from '../../actions/usuarioActions';
import FormHeader from '../Forms/FormHeader';

const validate = (values) => {
    let errors = {};

    if (!Validation.required(values.nombre)) {
        errors.nombre = Validation.requiredError()
    } else if (!Validation.stringMax(values.nombre, 255)) {
        errors.nombre = Validation.stringMaxError(255);
    }

    if (!Validation.required(values.rol_id)) {
        errors.rol_id = Validation.requiredError()
    } else if (!Validation.isInteger(values.rol_id)) {
        errors.rol_id = Validation.isIntegerError();
    }

    if (!Validation.required(values.email)) {
        errors.email = Validation.requiredError()
    } else if (!Validation.stringMax(values.email, 255)) {
        errors.email = Validation.stringMaxError(255);
    }

    if (!Validation.required(values.password)) {
        errors.password = Validation.requiredError()
    } else if (!Validation.stringMax(values.password, 255)) {
        errors.password = Validation.stringMaxError(255);
    }

    if (!Validation.required(values.telefono)) {
        errors.telefono = Validation.requiredError()
    } else if (!Validation.stringMax(values.telefono, 15)) {
        errors.telefono = Validation.stringMaxError(15);
    }

    return errors;
}

class UsuariosNewForm extends Component {
    componentDidMount() {
        const { getRoles } = this.props;

        getRoles();
    }

    onSubmit = (data) => {
        const { 
            storeUsuario, 
            requestStatus, 
            reset, 
            usuario,
            usuarioSetMeta,
            auth
        } = this.props;

        data = {
            ...data,
            usuarioCreador: auth.user.id
        }

        let newUser = Object.assign({}, data, {
            imagePerfil: usuario.meta.currentFileSelected
        });

        storeUsuario(newUser).then(() => {
            if (requestStatus === 'success') {
                usuarioSetMeta({
                    ...usuario.meta,
                    imagePerfilSelected: "Seleccione un archivo...",
                    currentFileSelected: undefined
                })
                reset();
            }
        });
    }

    handleCancelClick = (e) => {
        const { app, appUpdate, getUsuarios } = this.props;

        getUsuarios();
        appUpdate({
            ...app, 
            section: 'start'
        });
    }

    craftItemsRoles = (roles) => {
        const items = roles.map((rol, index) => {
            return (
                <option key={rol.id} value={rol.id}>{rol.nombre}</option>
            );
        });

        return items;
    }

    handleOnChangeImagePerfil = (e) => {
        let { usuario, usuarioSetMeta } = this.props;
        let file = e.target.files[0];

        if (file === 'undefined') {
            usuarioSetMeta({
                ...usuario.meta,
                imagePerfilSelected: "Seleccione un archivo...",
                currentFileSelected: undefined
            });

            return;
        }

        usuarioSetMeta({
            ...usuario.meta,
            imagePerfilSelected: file.name,
            currentFileSelected: file
        });
    }

    render() { 
        let { requestStatus, rol, usuario } = this.props;

        if (requestStatus === 'loading') {
            return <div>Insertando...</div>
        }

        return (
            <div className="row">
                <div className="col-12">
                    <form onSubmit={this.props.handleSubmit((data) => this.onSubmit(data))}>
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <FormHeader 
                                            title="Usuarios / Nuevo"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-goup col-12">
                                        <Field
                                            name="nombre"
                                            label="Nombre" 
                                            isRequired={true}
                                            component={RenderField}
                                            type="text"
                                            className="form-control"/>
                                    </div>
                                    <div className="form-goup col-12">
                                        <Field
                                            name="email"
                                            label="Email" 
                                            isRequired={true}
                                            component={RenderField}
                                            type="email"
                                            className="form-control"/>
                                    </div>
                                    <div className="form-goup col-12">
                                        <Field
                                            name="password"
                                            label="Contraseña" 
                                            isRequired={true}
                                            component={RenderField}
                                            type="password"
                                            className="form-control"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-goup col-6">
                                        <Field
                                            name="rol_id"
                                            label="Rol" 
                                            isRequired={true}
                                            isDisabled={false}
                                            component={RenderField}
                                            type="select"
                                            optionItems={this.craftItemsRoles(rol.items)}
                                            className="form-control"/>
                                    </div>
                                    <div className="form-goup col-6">
                                        <Field
                                            name="telefono"
                                            label="Teléfono" 
                                            isRequired={true}
                                            component={RenderField}
                                            type="text"
                                            className="form-control"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div>
                                            <label>Perfil</label>
                                        </div>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input 
                                                    type="file" 
                                                    className="custom-file-input" 
                                                    id="inputGroupFile04" 
                                                    aria-describedby="inputGroupFileAddon04" 
                                                    onChange={e => this.handleOnChangeImagePerfil(e)}/>
                                                <label 
                                                    className="custom-file-label" 
                                                    htmlFor="inputGroupFile04">{usuario.meta.imagePerfilSelected}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
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
        rol: state.rol,
        auth: state.auth,
        usuario: state.usuario,
        requestStatus: state.usuario.requestStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        storeUsuario: (usuario) => {
            return dispatch(storeUsuario(usuario));
        },
        getUsuarios: () => {
            dispatch(getUsuarios());
        },
        getRoles: () => {
            dispatch(getRoles());
        },
        reset: () => {
            dispatch(reset('usuariosNewForm'));
        },
        usuarioSetMeta: (meta) => {
            dispatch(usuarioSetMeta(meta));
        }
    }
}

UsuariosNewForm = reduxForm({
    form: 'usuariosNewForm',
    validate
})(UsuariosNewForm);

UsuariosNewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(UsuariosNewForm);

export default UsuariosNewForm;