import React, { Component } from 'react';
import CountCard from './CountCard';

class CountCards extends Component {
    render() {
        return(
            <div className="row">
                <div className="col-12 col-md-4">
                    <CountCard
                        title='Clientes'
                        count={this.props.counts.clientes} />
                </div>
                <div className="col-12 col-md-4">
                    <CountCard
                        title='Empresas'                    
                        count={this.props.counts.empresas} />
                </div>
                <div className="col-12 col-md-4">
                    <CountCard
                        title='Folios'
                        count={this.props.counts.folios}/>
                </div>
            </div>
        );
    }
}

export default CountCards;