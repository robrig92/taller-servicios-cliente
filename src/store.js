import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { app } from './reducers/appReducer';
import { rol } from './reducers/rolReducer';
import { auth } from './reducers/authReducer';
import { folio } from './reducers/folioReducer';
import { marca } from './reducers/marcaReducer';
import { cliente } from './reducers/clienteReducer';
import { empresa } from './reducers/empresaReducer';
import { estatus } from './reducers/estatusReducer';
import { servicio } from './reducers/servicioReducer';
import { permiso } from './reducers/permisoReducer';
import { usuario } from './reducers/usuarioReducer';
import { dashboard } from './reducers/dashboardReducer';
import { tipoEquipo } from './reducers/tipoEquipoReducer';

export const store = combineReducers({
    app,
    rol,
    auth,
    folio,
    marca,
    cliente,
    empresa,
    estatus,
    permiso,
    usuario,
    servicio,
    dashboard,
    tipoEquipo,
    form: formReducer
});