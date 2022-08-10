import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/actions/authAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from '../store/types/authType';

const Register = () => {

    const history = useNavigate();

    // console.log(history);

    const alert = useAlert();
    const { successMessage, error, authenticate } = useSelector(state => state.auth);

    // console.log(myInfo);

    const dispatch = useDispatch();

    const [state, setstate] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: ''
    });

    const [click, setClick] = useState(true);
    // console.log(click);

    const [loadImage, setLoadImage] = useState('');

    // <-------------------------- Input handle from Form -----------------------> //
    const inputHendle = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    // <---------------------------- User Image Upload --------------------------> //
    const fileHandle = e => {
        if (e.target.files.length !== 0) {
            setstate({
                ...state,
                [e.target.name]: e.target.files[0]
            })
        };
        const reader = new FileReader();
        reader.onload = () => {
            setLoadImage(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);

    }

    // console.log('result', loadImage);

    // <------------------------------- Submit Data ---------------------------> //
    const register = e => {

        const { userName, email, password, confirmPassword } = state;
        e.preventDefault();
        setClick(false);

        var formData = new FormData();

        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('image', loadImage);

        // console.log(loadImage);

        var newData = {};
        formData.forEach(function (value, key) {
            newData[key] = value;
        });

        // console.log(newData.image);


        dispatch(userRegister(newData));

    }

    useEffect(() => {

        if (authenticate && successMessage) {
            history('/login');
            // history('/messenger');
            console.log('Registration State', state);
        }

        if (!click && successMessage) {
            alert.success(successMessage);
            dispatch({ type: SUCCESS_MESSAGE_CLEAR });
        }

        if (!click && error) {
            alert.error(error);
            dispatch({ type: ERROR_CLEAR });
        }

    }, [successMessage, error]);

    return (
        <div className="register">
            <div className="card">
                <div className="card-header">
                    <h3>Register</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={register} >
                        <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <input type="text" onChange={inputHendle} name="userName" value={state.userName} className="form-control" placeholder="User Name" id="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={state.email} name='email' onChange={inputHendle} className="form-control" placeholder="Email" id="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' onChange={inputHendle} value={state.password} className="form-control" placeholder="Password" id="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input type="password" name='confirmPassword' onChange={inputHendle} value={state.confirmPassword} className="form-control" placeholder="Confirm Password" id="confirmPassword" />
                        </div>
                        <div className="form-group">
                            <div className="file-image">
                                <div className="image">
                                    {loadImage ? <img src={loadImage} /> : ''}
                                </div>
                                <div className="file">
                                    <label htmlFor="image">Select Image</label>
                                    <input accept="image/*" type="file" onChange={fileHandle} name="image" className="form-control" id="image" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="register" className="btn" />
                        </div>
                        <div className="form-group">
                            <span><Link to="/login">Login Your Account</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
