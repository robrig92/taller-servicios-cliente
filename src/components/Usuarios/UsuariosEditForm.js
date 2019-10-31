import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import { 
    getUsuarios,
    getUsuario,
    updateUsuario,
    deleteUsuario,
    usuarioSetMeta,
    getImagePerfilPath
} from '../../actions/usuarioActions';
import { getRoles } from '../../actions/rolActions';
import swal from 'sweetalert2';
import FormHeader from '../Forms/FormHeader';
import Constants from '../../Constants';

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

    if (!Validation.stringMax(values.password, 255)) {
        errors.password = Validation.stringMaxError(255);
    }

    if (!Validation.required(values.telefono)) {
        errors.telefono = Validation.requiredError()
    } else if (!Validation.stringMax(values.telefono, 15)) {
        errors.telefono = Validation.stringMaxError(15);
    }

    return errors;
}

class UsuariosEditForm extends Component {
    componentWillMount() {
        const { 
            meta,
            usuarioSetMeta,
            getRoles,
            getUsuario,
            usuario,
            getImagePerfilPath
        } = this.props;

        getRoles();
        getUsuario(usuario.hashId)
            .then(() => {
                getImagePerfilPath(usuario.hashId);
            });
        usuarioSetMeta({
            ...meta,
            imagePerfilSelected: "Seleccione un archivo...",
            currentFileSelected: undefined
        });
        
    }

    onSubmit = (data) => {
        const { 
            meta,
            usuario,
            requestStatus,
            updateUsuario,
            usuarioSetMeta,
            getImagePerfilPath
        } = this.props;

        let updatingUser = Object.assign({}, data, {
           imagePerfil: meta.currentFileSelected
        });

        updateUsuario({
            ...usuario,
            ...updatingUser
        }).then(() => {
            if (requestStatus === 'success') {
                usuarioSetMeta({
                    ...meta,
                    imagePerfilSelected: "Seleccione un archivo...",
                    currentFileSelected: undefined
                });
                getImagePerfilPath(usuario.hashId);
            }
        });
    }

    handleCancelClick = (e) => {
        const { app, appUpdate, getUsuarios, meta, usuarioSetMeta } = this.props;

        getUsuarios();
        appUpdate({
            ...app, 
            section: 'start'
        });
        usuarioSetMeta({
            ...meta,
            imagePerfilSelected: "Seleccione un archivo...",
            currentFileSelected: undefined,
            imagePathServer: ''
        });
    }

    handleBorrarClick = (e) => {
        let { usuario, deleteUsuario } = this.props;

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
                    deleteUsuario(usuario.hashId).then(() => {
                        this.handleCancelClick(e);
                    });
                }
            });

    }

    craftItemsRoles = (roles, selected) => {
        const items = roles.map((rol, index) => {
            return (
                <option 
                    key={rol.id} 
                    value={rol.id} >
                    {rol.nombre}
                </option>
            );
        });

        return items;
    }

    handleOnChangeImagePerfil = (e) => {
        let { usuarioSetMeta, meta } = this.props;
        let file = e.target.files[0];

        if (file === 'undefined') {
            usuarioSetMeta({
                ...meta,
                imagePerfilSelected: "Seleccione un archivo...",
                currentFileSelected: undefined
            });

            return;
        }

        usuarioSetMeta({
            ...meta,
            imagePerfilSelected: file.name,
            currentFileSelected: file
        });
    }

    render() { 
        let { requestStatus, rol, usuario, meta } = this.props;

        if (requestStatus === 'loading') {
            return <div>Actualizando...</div>
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
                                            title="Usuarios / Editar"/>
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
                                            isDisabled={true}
                                            component={RenderField}
                                            type="email"
                                            className="form-control"/>
                                    </div>
                                    <div className="form-goup col-12">
                                        <Field
                                            name="password"
                                            label="Contraseña" 
                                            isRequired={false}
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
                                            optionItems={this.craftItemsRoles(rol.items, usuario.rol_id)}
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
                                            htmlFor="inputGroupFile04">{meta.imagePerfilSelected}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            meta.imagePathServer !== '' && 
                            <div className="row">
                                <div className="col-12">
                                    <img style={{marginTop: '10px'}} src={Constants.Api.storageHost + meta.imagePathServer} alt="Imagen perfil" height="200px" />
                                </div>
                            </div>
                        }
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
        usuario: state.usuario.current,
        meta: state.usuario.meta,
        rol: state.rol,
        initialValues: state.usuario.current,
        requestStatus: state.usuario.requestStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        updateUsuario: (usuario) => {
            return dispatch(updateUsuario(usuario));
        },
        getUsuarios: () => {
            dispatch(getUsuarios());
        },
        getUsuario: (id) => {
            return dispatch(getUsuario(id));
        },
        deleteUsuario: (id) => {
            return dispatch(deleteUsuario(id));
        },
        getRoles: () => {
            dispatch(getRoles());
        },
        usuarioSetMeta: (meta) => {
            dispatch(usuarioSetMeta(meta));
        },
        getImagePerfilPath: (hashId) => {
            dispatch(getImagePerfilPath(hashId));
        }
    }
}

UsuariosEditForm = reduxForm({
    form: 'usuariosEditForm',
    enableReinitialize: true,
    validate
})(UsuariosEditForm);

UsuariosEditForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(UsuariosEditForm);

export default UsuariosEditForm;