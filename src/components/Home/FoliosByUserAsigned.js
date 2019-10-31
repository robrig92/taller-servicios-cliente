import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import {
    getDashboardFoliosByUsuarioAsignado
} from '../../actions/dashboardActions';
import CustomBarChart from './CustomBarChart';

class FoliosByUsuarioAsigned extends Component {
    componentDidMount() {
        let {
            getDashboardFoliosByUsuarioAsignado
        } = this.props;

        getDashboardFoliosByUsuarioAsignado();
    }

    render() {
        let {
            dashboard
        } = this.props;

        if (dashboard.requestStatus === 'loading') {
            return null;
        }

        const data = {
            data: dashboard.foliosByUsuarioAsignado,
            config: [{
                dataKey: 'Folios',
                fill: '#82ca9d'
            }]
        };

        return ( <
            CustomBarChart data = {
                data
            }
            xaxisDataKey = "nombre"
            title = "Folios por usuario asignado" / >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDashboardFoliosByUsuarioAsignado: () => {
            dispatch(getDashboardFoliosByUsuarioAsignado());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FoliosByUsuarioAsigned);