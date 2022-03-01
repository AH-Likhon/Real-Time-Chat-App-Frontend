import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="register">
            <div className="card">
                <div className="card-header">
                    <h3>Register</h3>
                </div>

                <div className="card-body">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="userName">User Name</label>
                            <input type="text" className='form-control' id='userName' placeholder='User Name' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className='form-control' id='email' placeholder='Email' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className='form-control' id='password' placeholder='Password' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" className='form-control' id='confirmPassword' placeholder='Confirm Password' />
                        </div>

                        <div className="form-group">
                            <div className="file-image">
                                <div className="image">

                                </div>
                                <div className="file">
                                    <label htmlFor="image">Upload Image</label>
                                    <input type="file" className="form-control" id="image"/>
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