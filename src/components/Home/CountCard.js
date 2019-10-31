import React, { Component } from 'react';

class ClienteCard extends Component {
    render() {
        return(
            <div className="card bg-light text-center">
                <div className="card-header">
                    <h2>{this.props.title}</h2>
                </div>
                <div className="card-body">
                    <h3>{this.props.count}</h3>
                </div>
            </div>
        );
    }
}

export default ClienteCard