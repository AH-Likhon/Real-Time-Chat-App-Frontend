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
    const { loading, successMessage, error, authenticate, myInfo } = useSelector(state => state.auth);

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
    console.log(click);

    const [loadImage, setLoadImage] = useState('');

    const inputHendle = (e) => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const fileHandle = e => {
        if (e.target.files.length !== 0) {

            // function getBase64(file) {
            //     return new Promise((resolve, reject) => {
            //       const reader = new FileReader();
            //       reader.readAsDataURL(file);
            //       reader.onload = () => resolve(reader.result);
            //       reader.onerror = error => reject(error);
            //     });
            //   }

            // let base64Image = getBase64(e.target.files[0]).then(
            //     data => data
            //   );

            // function getDataUrl(img) {
            //     // Create canvas
            //     const canvas = document.createElement('canvas');
            //     const ctx = canvas.getContext('2d');
            //     // Set width and height
            //     canvas.width = img.width;
            //     canvas.height = img.height;
            //     // Draw the image
            //     ctx.drawImage(img, 0, 0);
            //     return canvas.toDataURL('image/*');
            //  }

            //  const dataUrl = getDataUrl(e.target.files[0]);
            //  console.log(dataUrl);

            // function encodeImageFileAsURL(e) {
            //     const file = e.target.files[0];
            //     const reader = new FileReader();
            //     reader.readAsDataURL(file);
            //     reader.onloadend = () => {
            //         return reader.result;
            //     } 

            //     //   console.log('RESULT', reader.result);
            //     // console.log('RESULT', reader.result);
            //   }

            //   console.log(encodeImageFileAsURL(e));

            //   console.log("Result", e.target.name);

            setstate({
                ...state,
                [e.target.name]: e.target.files[0]
            })
        }

        const reader = new FileReader();

        reader.onload = () => {
            setLoadImage(reader.result);
        }


        reader.readAsDataURL(e.target.files[0]);

    }

    // console.log('result', loadImage);

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

        // let newData = {};

        //    const newData = formData.forEach(el => el);

        var newData = {};
        formData.forEach(function (value, key) {
            newData[key] = value;
        });

        // console.log(newData.image);


        dispatch(userRegister(newData));

    }

    useEffect(() => {

        // if(!click){

        // }else{
        //     alert.removeAll();
        // }

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

    // useEffect(()=>{
    //     if(authenticate){
    //         history.push('/')
    //     }
    //     if(successMessage){
    //         alert.success(successMessage);
    //         dispatch({type : SUCCESS_MESSAGE_CLEAR})
    //     }
    //     if(error){
    //         error.map(err=>alert.error(err));
    //         dispatch({type : ERROR_CLEAR})
    //     }
    // },[successMessage,error])

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
