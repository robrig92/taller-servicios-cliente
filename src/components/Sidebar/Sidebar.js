import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appUpdate } from '../../actions/appActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faStore,
    faUsers,
    faCoffee,
    faDesktop,
    faChartPie,
    faBriefcase,
    faUserSecret,
    faAddressBook,
    faClipboardList,
} from '@fortawesome/free-solid-svg-icons';

class Sidebar extends Component {
    /**
     * Update the store with the module to be rendered.
     * 
     * @param  string clicked
     * @return void
     */
    handleOnClick = (clicked) => {
        const { app, appUpdate } = this.props;

        appUpdate({
            ...app,
            module: clicked
        });
    }

    /**
     * Render the option in the menu if it's  alloweed to see.
     * 
     * @param  string item
     * @return bool
     */
    renderOption = (item) => {
        let { permisos } = this.props;

        for (let i = 0; i < permisos.length; i++) {
            const permiso = permisos[i];
            
            if (permiso.nombre === item) {
                return true;
            }
        }

        return false;
    }

    render() { 
        const { app } = this.props;

        return (
            <div className="list-group Sidebar">
                <ul
                    onClick={e => this.handleOnClick('home')} 
                    className={`Sidebar-Link list-group-item list-group-item-action ${app.module === 'home' ? 'active' : ''}`}
                    hidden={!this.renderOption('Dashboard')}>
                    <FontAwesomeIcon icon={faChartPie} size="lg" fixedWidth/> {' '} Dashboard
                </ul>
                <ul
                    onClick={e => this.handleOnClick('cliente')} 
                    className={`Sidebar-Link list-group-item list-group-item-action ${app.module === 'cliente' ? 'active' : ''}`}
                    hidden={!this.renderOption('Clientes')}>
                    <FontAwesomeIcon icon={faAddressBook} size="lg" fixedWidth/> {' '} Clientes
                </ul>
                <ul
                    onClick={e => this.handleOnClick('tipoequipo')} 
                    className={`Sidebar-Link list-group-item list-group-item-action ${app.module === 'tipoequipo' ? 'active' : ''}`}
                    hidden={!this.renderOption('Equipos')}>
                    <FontAwesomeIcon icon={faDesktop} size="lg" fixedWidth /> {' '} Equipos
                </ul>
                <ul
                    onClick={e => this.handleOnClick('empresa')} 
                    className={`Sidebar-Link list-group-item list-group-item-action ${app.module === 'empresa' ? 'active' : ''}`}
                    hidden={!this.renderOption('Empresas')}>
                    <FontAwesomeIcon icon={faStore} size="lg" fixedWidth /> {' '} Empresas
                </ul>
                <ul
                    onClick={e => this.handleOnClick('folios')} 
                    className={`Sidebar-Link list-group-item list-group-item-action ${app.module === 'folios' ? 'active' : ''}`}
                    hidden={!this.renderOption('Folios')}>
                    <FontAwesomeIcon icon={faClipboardList} size="lg" fixedWidth /> {' '} Folios
                </ul>
                <ul 
                    onClick={e => this.handleOnClick('marcas')} 
                    className={`Sidebar-Link list-group-item list-group-item-action ${app.module === 'marcas' ? 'active' : ''}`}
                    hidden={!this.renderOption('Marcas')}>
                    <FontAwesomeIcon icon={faCoffee} size="lg" fixedWidth /> {' '} Marcas
                </ul>
                <ul 
                    onClick={e => this.handleOnClick('roles')} 
                    className={`Sidebar-Link list-group-item list-group-item-action ${app.module === 'roles' ? 'active' : ''}`}
                    hidden={!this.renderOption('Roles')}>
                    <FontAwesomeIcon icon={faUserSecret} size="lg" fixedWidth /> {' '} Roles
                </ul>
                <ul
                    onClick={e => this.handleOnClick('servicio')} 
                    className={`Sidebar-Link list-group-item list-group-item-action ${app.module === 'servicio' ? 'active' : ''}`}
                    hidden={!this.renderOption('Servicios')}>
                    <FontAwesomeIcon icon={faBriefcase} size="lg" fixedWidth /> {' '} Servicios
                </ul>
                <ul 
                    onClick={e => this.handleOnClick('usuarios')} 
                    className={`Sidebar-Link list-group-item list-group-item-action ${app.module === 'usuarios' ? 'active' : ''}`}
                    hidden={!this.renderOption('Usuarios')}>
                    <FontAwesomeIcon icon={faUsers} size="lg" fixedWidth /> {' '} Usuarios
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        app: state.app,
        permisos: state.auth.user.rol.permisos
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        appUpdate: (app) => {
            dispatch(appUpdate(app));
        }
    };
}

Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);

export default Sidebar;