import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegister } from '../store/actions/auth';

const Register = () => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: ''
    });

    const [image, setImage] = useState('');

    const inputHandle = e => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    };

    const fileHandle = e => {
        if(e.target.files.length !== 0){
            setState({
                ...state,
                [e.target.name] : e.target.value
            })
        }

        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        }

        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = e => {
        const { userName, email, password, confirmPassword, image } = state;

        const formData = new FormData();

        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('image', image);

        dispatch(userRegister(formData));

        e.preventDefault();
        // console.log(state);
    }

    return (
        <div className="register">
            <div className="card">
                <div className="card-header">
                    <h3>Register</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="userName">User Name</label>
                            <input type="text" name='userName' value={state.userName} onChange={inputHandle} className='form-control' id='userName' placeholder='User Name'/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' value={state.email} onChange={inputHandle} className='form-control' id='email' placeholder='Email' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password' value={state.password} onChange={inputHandle} className='form-control' id='password' placeholder='Password' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name='confirmPassword' value={state.confirmPassword} onChange={inputHandle} className='form-control' id='confirmPassword' placeholder='Confirm Password' />
                        </div>

                        <div className="form-group">
                            <div className="file-image">
                                <div className="image">
                                    {image ? <img src={image} alt="Avatar"/> : ''}
                                </div>
                                <div className="file">
                                    <label htmlFor="image">Upload Image</label>
                                    <input type="file" name='image' onChange={fileHandle} className="form-control" id="image"/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Register" className="btn" />
                        </div>

                        <div className="form-group">
                            <span>
                                <Link to="/login">Login Your Account</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;