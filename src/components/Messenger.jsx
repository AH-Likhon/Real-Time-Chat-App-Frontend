import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import img from '../images/image.jpg'

const Messenger = () => {
    return (
        <div className="messenger">
            <div className="row">
                <div className="col-3">

                {/* Start Left Side  */}
                    <div className="left-side">
                        <div className="top">
                            <div className="image-name">
                                <div className="image">
                                    <img src={img} alt="My_Image" />
                                </div>
                                <div className="name">
                                    <h3>Likhon</h3>
                                </div>
                            </div>

                            <div className="icons">
                                <div className="icon">
                                    <BsThreeDots />
                                </div>
                                <div className="icon">
                                    <FaEdit />
                                </div>
                            </div>
                        </div>

                        <div className="friend-search">
                            <div className="search">
                                <button> <BiSearch /> </button>
                                <input type="text" placeholder='Search' className="form-control" />
                            </div>
                        </div>
                    </div>
                {/* End Left Side  */}

                </div>
            </div>
        </div>
    );
};

export default Messenger;