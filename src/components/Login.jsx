import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../store/actions/authAction';
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from '../store/types/authType';

const Login = () => {

    const history = useNavigate();

    // console.log(history);

    const alert = useAlert();
    const { successMessage, error, authenticate } = useSelector(state => state.auth);

    const [click, setClick] = useState(true);

    const dispatch = useDispatch();

    const [state, setState] = useState({ email: '', password: '' });

    // <-------------------------- Handle OnChange Input ------------------------> //
    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    // <---------------------------- Submit Login Data --------------------------> //
    const login = e => {
        e.preventDefault();

        // console.log(state);

        dispatch(userLogin(state));

        setClick(false);
    }

    useEffect(() => {

        if (authenticate) {
            history('/messenger');
        }

        if (!click && successMessage) {
            alert.success(successMessage);
            dispatch({ type: SUCCESS_MESSAGE_CLEAR })
            // alert.remove(successMessage);
            // alert.removeAll()
        }

        if (!click && error) {
            alert.error(error);
            dispatch({ type: ERROR_CLEAR })
            // alert.remove(error);
            // alert.removeAll()
        }

    }, [successMessage, error])

    return (
        <div className="login">
            <div className="card">
                <div className="card-header">
                    <h3>Login</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input onChange={handleChange} value={state.email} type="email" name='email' placeholder='Email' id='email' className='form-control' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={handleChange} value={state.password} type="password" name='password' placeholder='Password' id='password' className='form-control' />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn" />
                        </div>
                        <div className="form-group">
                            <span>
                                <Link to="/register">Register Your Account</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;