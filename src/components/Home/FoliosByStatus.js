import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getDashboardFoliosByEstatus
} from '../../actions/dashboardActions';
import CustomBarChart from './CustomBarChart';

class FoliosByStatus extends Component {
    componentDidMount() {
        let {
            getDashboardFoliosByEstatus
        } = this.props;

        getDashboardFoliosByEstatus();
    }

    render() {
        let { dashboard } = this.props;

        if (dashboard.requestStatus === 'loading') {
            return null;
        }

        const data = {
            data: dashboard.foliosByEstatus,
            config: [
                {
                    dataKey: 'Folios',
                    fill: '#82ca9d'
                }
            ]
        };

        return (
            <CustomBarChart
                data={data}
                xaxisDataKey="estatus"
                title="Folios por estatus"/>
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
        getDashboardFoliosByEstatus: () => {
            dispatch(getDashboardFoliosByEstatus());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FoliosByStatus);