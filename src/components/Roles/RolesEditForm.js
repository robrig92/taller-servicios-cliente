import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../Core/Forms/RenderField';
import Validation from '../../validation/Validation';
import { appUpdate } from '../../actions/appActions';
import {
    getRoles,
    getRol,
    updateRol,
    deleteRol,
    rolSetMeta,
    rolAddPermiso,
    rolDeletePermiso
} from '../../actions/rolActions';
import {
    getPermisos
} from '../../actions/permisoActions';
import swal from 'sweetalert2';
import FormHeader from '../Forms/FormHeader';
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faMinusCircle
} from '@fortawesome/free-solid-svg-icons';

const validate = (values) => {
    let errors = {};

    if (!Validation.required(values.nombre)) {
        errors.nombre = Validation.requiredError()
    } else if (!Validation.stringMax(values.nombre, 255)) {
        errors.nombre = Validation.stringMaxError(255);
    }

    return errors;
}

class RolesEditForm extends Component {
    permissionSelected = '';

    componentWillMount() {
        const {
            rol,
            meta,
            getRol,
            rolSetMeta,
            getPermisos
        } = this.props;

        getRol(rol.id);
        getPermisos();
        rolSetMeta({
            ...meta,
            addPermission: false
        });
    }

    onSubmit = (data) => {
        const { updateRol, rol } = this.props;

        updateRol({
            ...rol,
            ...data
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

    handleBorrarClick = (e) => {
        let { rol, deleteRol } = this.props;

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
                    deleteRol(rol.id).then(() => {
                        this.handleCancelClick(e);
                    });
                }
            });
    }

    getAvailablePermissions = (permissions, rolPermissions) => {
        let granted;
        let permissionsAvailable = [];

        for (let i = 0; i < permissions.length; i++) {
            granted = false;

            for (let j = 0; j < rolPermissions.length; j++) {
                if (permissions[i].nombre === rolPermissions[j].nombre) {
                    granted = true;
                    break;
                }
            }

            if (!granted) {
                permissionsAvailable.push(permissions[i]);
            }
        }

        return permissionsAvailable;
    }

    craftPermissionsItems = (permissions) => {
        let items = permissions.map(permission => (
            <option key={permission.id} value={permission.id}>{permission.nombre}</option>
        ));

        return items;
    }

    addPermissionClick = (e) => {
        let {
            meta,
            rolSetMeta
        } = this.props;

        e.preventDefault();

        rolSetMeta({
            ...meta,
            addPermission: !meta.addPermission
        });
    }

    storePermission = (permisoId) => {
        let { rol, rolAddPermiso } = this.props;

        if (permisoId === '') {
            return;
        }

        rolAddPermiso(rol.id, permisoId);
    }
    
    destroyPermission = (e, permisoId) => {
        let { rol, rolDeletePermiso } = this.props;

        e.preventDefault();

        rolDeletePermiso(rol.id, permisoId);
    }

    render() { 
        let {
            rol,
            meta,
            permisos,
            requestStatus
        } = this.props;
        let rowsPermisos;
        let permissionsAvailables;
        
        if (rol.permisos === undefined) {
            return null;
        }

        rowsPermisos = rol.permisos.map(permiso => (
            <tr key={permiso.id}>
                <td>{permiso.nombre}</td>
                <td>{permiso.descripcion}</td>
                <td>
                    {
                        rol.nombre !== 'Administrador' &&
                        <button 
                            onClick={e => {this.destroyPermission(e, permiso.id)}}
                            className="btn btn-info">
                            <FontAwesomeIcon icon={faMinusCircle} />
                        </button>
                    }
                </td>
            </tr>
        ));

        permissionsAvailables = this.getAvailablePermissions(permisos, rol.permisos);

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
                                    title="Roles / Editar"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-goup">
                                    <Field
                                        name="nombre"
                                        label="Rol" 
                                        isDisabled={rol.nombre === 'Administrador' ? true : false}
                                        isRequired={true}
                                        component={RenderField}
                                        type="text"
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: '10px'}}>
                            <div className="col-12">
                                <hr />
                                <div className="row">
                                    <div className="col-10">
                                        <h3>Permisos</h3>
                                    </div>
                                    <div className="col-2">
                                        {
                                            rol.nombre !== 'Administrador' &&
                                            <button 
                                                className="btn btn-info"
                                                onClick={e => (this.addPermissionClick(e))}>Agregar
                                            </button>
                                        }
                                    </div>
                                </div>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Permiso</th>
                                            <th>Descripción</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowsPermisos}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <button className="btn btn-info" type="button" onClick={e => this.handleCancelClick(e)}>Regresar</button>{' '}
                                {
                                    rol.nombre !== 'Administrador' && 
                                    <div style={{display: 'inline-block'}}>
                                        <button className="btn btn-info" type="submit">Guardar</button> {' '}
                                        <button className="btn btn-info" type="button" onClick={e => this.handleBorrarClick(e)}>Borrar</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
                {
                    meta.addPermission &&
                    <div style = {
                        {
                            position: 'absolute',
                            height: '100%',
                            width: '98%',
                            backgroundColor: 'rgba(237, 237, 237, 0.9)',
                            zIndex: '1'
                        }
                    }> 
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div style={{marginTop: '10%'}}>
                                        <select 
                                            className="form-control"
                                            ref={node => {this.permissionSelected = node}}>
                                            <option value=''>Seleccione...</option>
                                            {this.craftPermissionsItems(permissionsAvailables)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12" style={{marginTop: '10px'}}>
                                    <button 
                                        className="btn btn-info col-12"
                                        onClick={e => {
                                            this.storePermission(this.permissionSelected.value);
                                        }}>Agregar</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12" style={{marginTop: '10px'}}>
                                    <button 
                                        className="btn btn-info col-12"
                                        onClick={e => {this.addPermissionClick(e)}}>Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        rol: state.rol.current,
        meta: state.rol.meta,
        permisos: state.permiso.items,
        initialValues: state.rol.current,
        requestStatus: state.rol.requestStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        },
        updateRol: (rol) => {
            return dispatch(updateRol(rol));
        },
        getRoles: () => {
            dispatch(getRoles());
        },
        getRol: (id) => {
            return dispatch(getRol(id));
        },
        deleteRol: (id) => {
            return dispatch(deleteRol(id));
        },
        getPermisos: () => {
            return dispatch(getPermisos());
        },
        rolSetMeta: (meta) => {
            dispatch(rolSetMeta(meta));
        },
        rolAddPermiso: (id, permisoId) => {
            dispatch(rolAddPermiso(id, permisoId));
        },
        rolDeletePermiso: (id, permisoId) => {
            dispatch(rolDeletePermiso(id, permisoId));
        }
    }
}

RolesEditForm = reduxForm({
    form: 'rolesEditForm',
    enableReinitialize: true,
    validate
})(RolesEditForm);

RolesEditForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(RolesEditForm);

export default RolesEditForm;