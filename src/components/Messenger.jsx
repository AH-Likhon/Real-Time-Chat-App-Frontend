import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import myImage from '../images/image.jpg';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';

const Messenger = () => {
    return (
        <div className="messenger">
            <div className="row">

                {/* Start Left Side  */}
                <div className="col-3">
                    <div className="left-side">
                        <div className="top">
                            <div className="image-name">
                                <div className="image">
                                    <img src={myImage} alt="My_Image" />
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

                        {/* Start Active Friends */}
                        <div className="active-friends">
                            <ActiveFriend />
                        </div>
                        {/* End Active Friends */}

                        {/* Start Friends  */}
                        <div className="friends">
                            <div className="hover-friend active">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend active">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                            <div className="hover-friend">
                                <Friends />
                            </div>
                        </div>
                        {/* End Friends  */}

                    </div>
                </div>
                {/* End Left Side  */}

                {/* Start Right Side  */}
                <RightSide />
                {/* End Right Side  */}
            </div>
        </div>
    );
};

export default Messenger;