import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    reduxForm,
    Field
} from 'redux-form';
import {
    authLogin
} from '../../actions/authActions';
import RenderField from '../Core/Forms/RenderField';
import App from '../../App';

class Login extends Component {
    onSubmit = (data) => {
        const { authLogin } = this.props;
        localStorage.setItem("user", "");
        authLogin({
            'email': data.email,
            'password': data.password
        });
    }

    render() {
        const { auth } = this.props;

        if (auth.user !== null && auth.token !== '') {
            localStorage.setItem("token", auth.token);
            return <App />
        }

        return (
            <div className="container Login">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <form 
                                    className="LoginForm"
                                    onSubmit={this.props.handleSubmit((data) => this.onSubmit(data))}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-goup">
                                                <Field
                                                    name="email"
                                                    label="Email" 
                                                    isRequired={false}
                                                    component={RenderField}
                                                    type="email"
                                                    className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-goup">
                                                <Field
                                                    name="password"
                                                    label="Password" 
                                                    isRequired={false}
                                                    component={RenderField}
                                                    type="password"
                                                    className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        auth.requestStatus === 'error' &&
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="mt-3 mb-1 alert alert-danger text-center" role="alert">
                                                    Credenciales incorrectas
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <button className="mt-3 btn btn-info col-12" type="submit">Login</button>{' '}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login = reduxForm({
    form: 'LoginForm',
    enableReinitialize: true,
    // validate
})(Login);

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authLogin: (credentials) => {
            dispatch(authLogin(credentials));
        }
    }
}

Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default Login;