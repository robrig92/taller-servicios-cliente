import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountCards from './CountCards';
import { getDashboardCounts } from '../../actions/dashboardActions';
import FoliosByStatus from './FoliosByStatus';
import FoliosByUserCreated from './FoliosByUserCreated';
import FoliosByUserAsigned from './FoliosByUserAsigned';

class Home extends Component {
    componentWillMount() {
        let { getDashboardCounts } = this.props;

        getDashboardCounts();
    }

    render() { 
        let { dashboard } = this.props;

        return (  
            <div>
                <div className="row" style={{marginTop: '10px'}}>
                    <div className="col-12">
                        <CountCards counts={dashboard.counts}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <FoliosByStatus />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <FoliosByUserCreated />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <FoliosByUserAsigned />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDashboardCounts: () => {
            dispatch(getDashboardCounts());
        }
    }
}

Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default Home;