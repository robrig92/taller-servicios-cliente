import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import {
    getDashboardFoliosByUsuarioCreador
} from '../../actions/dashboardActions';
import CustomBarChart from './CustomBarChart';

class FoliosByUsuarioCreated extends Component {
    componentDidMount() {
        let {
            getDashboardFoliosByUsuarioCreador
        } = this.props;

        getDashboardFoliosByUsuarioCreador();
    }

    render() {
        let {
            dashboard
        } = this.props;

        if (dashboard.requestStatus === 'loading') {
            return null;
        }

        const data = {
            data: dashboard.foliosByUsuarioCreador,
            config: [{
                dataKey: 'Folios',
                fill: '#8884d8'
            }]
        };

        return ( <
            CustomBarChart data = {
                data
            }
            xaxisDataKey = "nombre"
            title = "Folios creados por usuario" / >
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
        getDashboardFoliosByUsuarioCreador: () => {
            dispatch(getDashboardFoliosByUsuarioCreador());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FoliosByUsuarioCreated);