import React, { useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import myImage from '../images/image.jpg';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../store/actions/messengerAction';

const Messenger = () => {

    const { friends } = useSelector( state => state.messenger );
    const { myInfo } = useSelector( state => state.auth );
    console.log(myInfo);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends())
    },[]);

    return (
        <div className="messenger">
            <div className="row">

                {/* Start Left Side  */}
                <div className="col-3">
                    <div className="left-side">
                        <div className="top">
                            <div className="image-name">
                                <div className="image">
                                    <img src={myInfo.image} alt="My_Image" />
                                </div>
                                <div className="name">
                                    <h3>{myInfo.userName}</h3>
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
                            {
                                friends && friends.length > 0 ? friends.map(friend => <div className="hover-friend active">
                                    <Friends key={friend._id} friend={friend}/>
                                </div>) : 'No friends are available now.'
                            }
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