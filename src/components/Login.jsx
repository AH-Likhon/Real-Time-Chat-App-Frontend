import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {

        const result = { email, password };
        console.log(result);
        fetch('logIn', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(result),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.log('Error:', error);
        });

        e.preventDefault();
    }

    return (
        <div className="login">
            <div className="card">
                <div className="card-header">
                    <h3>Login</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input onChange={e => setEmail(e.target.value)} type="email" name='email' placeholder='Email' id='email' className='form-control'/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={e => setPassword(e.target.value)} type="password" name='password' placeholder='Password' id='password' className='form-control'/>
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