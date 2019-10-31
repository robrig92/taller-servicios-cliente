import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './components/Home/Home';
import Sidebar from './components/Sidebar/Sidebar';
import RolesGrid from './components/Roles/RolesGrid';
import MarcasGrid from './components/Marcas/MarcasGrid';
import UsuariosGrid from './components/Usuarios/UsuariosGrid';
import TipoEquipoGrid from './components/TipoEquipo/TipoEquipoGrid';
import ServiciosGrid from './components/Servicios/ServiciosGrid';
import EmpresasGrid from './components/Empresas/EmpresasGrid';
import ClientesGrid from './components/Clientes/ClientesGrid';
import FoliosGrid from './components/Folios/FoliosGrid';
import Login from './components/Login/Login';
import {
    authLogoutSuccess
} from './actions/authActions';
import {
    appMenuDisplay
} from './actions/appActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faList,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

class FakeMain extends Component {
    handleLogOutClick = () => {
        const { authLogoutSuccess } = this.props;

        authLogoutSuccess();
    }

    renderModule = (module) => {
        switch(module) {
            case 'home':
                return <Home />
                // No break
             case 'folios':
                return <FoliosGrid />
                // No break
             case 'usuarios':
                return <UsuariosGrid />
                // No break
             case 'marcas':
                return <MarcasGrid />
                // No break
             case 'roles':
                return <RolesGrid />
                // No break
             case 'tipoequipo':
                return <TipoEquipoGrid />
                // No break
             case 'servicio':
                return <ServiciosGrid />
                // No break
            case 'empresa':
                return <EmpresasGrid />
                // No break
             case 'cliente':
                return <ClientesGrid />
                // No break
            default: 
                return null;
                // No breal
        }
    }

    render() {
        const { auth, app, appMenuDisplay } = this.props;

        if (!localStorage.getItem('token') || auth.token === '' || auth.user === null) {
            return <Login />
        }

        return(
            <div className="container-fluid">
                <div 
                    className="row" 
                    style={{ backgroundColor: 'rgb(38, 31, 67)', color: '#fff' }}>
                    <div className="col-10" >
                        <div 
                            style={{display: 'inline-flex'}}
                            className="align-self-center">
                            <FontAwesomeIcon 
                                style={{cursor: 'pointer'}}
                                icon={faList} 
                                size="lg" 
                                fixedWidth 
                                onClick={e => {appMenuDisplay()}} />
                        </div>
                        <h1 style={{display: 'inline'}}>Taller de Servicio</h1>
                    </div>
                    <div className="col-2 align-self-center text-right">
                        <div>
                            <FontAwesomeIcon 
                                style={{cursor: 'pointer'}}
                                icon={faSignOutAlt} 
                                size="lg" 
                                fixedWidth 
                                onClick={this.handleLogOutClick} />
                            <div className="d-none d-md-inline">{auth.user.nombre}</div>
                        </div>
                        
                    </div>
                </div>
                <div className="row">
                    <div className={"App-Sidebar col-md-2" + (app.menuDisplay ? '' : " d-none")} style={{ padding: 0 }}>
                        <div className="col-sm-12 text-left" style={{ padding: '0 0' }}>
                            <Sidebar />
                        </div>
                    </div>
                    <div className={"col-md-" + (app.menuDisplay ? '10' : '12')}>
                        <div className="container-fluid">
                            {this.renderModule(app.module)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        app: state.app
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authLogoutSuccess: () => {
            dispatch(authLogoutSuccess());
        },
        appMenuDisplay: () => {
            dispatch(appMenuDisplay());
        }
    }
}

FakeMain = connect(
    mapStateToProps,
    mapDispatchToProps
)(FakeMain);

class App extends Component {
    render() {
        return (
            <div> 
                <FakeMain />
            </div>
        );
    }
}

export default App;
