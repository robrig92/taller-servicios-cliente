import React, { Component } from 'react';

class FormHeader extends Component {
    render() { 
        const { title } = this.props;
        return (
            <div>
                <h1>{title}</h1>
                <hr />
            </div>
        );
    }
}
 
export default FormHeader;