import React, { useEffect, useState, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, messageSend, getMessage } from '../store/actions/messengerAction';

const Messenger = () => {

    const scrollRef = useRef();
    const { friends, message } = useSelector(state => state.messenger);
    const { myInfo } = useSelector(state => state.auth);

    const myFriends = friends.filter(friend => friend.email !== myInfo.email);
    // console.log(myFriends);

    const [currentFrnd, setCurrentFrnd] = useState('');
    // console.log(currentFrnd);

    const [newMessage, setNewMessage] = useState('');

    const dispatch = useDispatch();

    const handleInput = e => {
        setNewMessage(e.target.value);
    }

    const sendMessage = e => {
        e.preventDefault();
        // console.log(newMessage);
        const data = {
            senderId: myInfo.id,
            senderName: myInfo.userName,
            receiverId: currentFrnd._id,
            message: newMessage ? newMessage : '❤️'
        };

        dispatch(messageSend(data));
    }

    useEffect(() => {
        dispatch(getFriends())
    }, []);

    useEffect(() => {
        if (friends && friends.length > 0) {
            setCurrentFrnd(friends[0]);
        }
    }, [friends]);

    useEffect(() => {
        dispatch(getMessage(currentFrnd._id, myInfo.id))
    }, [currentFrnd?._id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message])

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
                            {/* active */}
                            {
                                myFriends && myFriends.length > 0 ? myFriends.map(friend => <div onClick={() => setCurrentFrnd(friend)} className={currentFrnd._id === friend._id ? "hover-friend active" : "hover-friend"}>
                                    <Friends key={friend._id} friend={friend} />
                                </div>) : 'No friends are available now.'
                            }
                        </div>
                        {/* End Friends  */}

                    </div>
                </div>
                {/* End Left Side  */}

                {/* Start Right Side  */}
                {
                    currentFrnd ? <RightSide
                        key={currentFrnd._id}
                        currentFrnd={currentFrnd}
                        newMessage={newMessage}
                        handleInput={handleInput}
                        sendMessage={sendMessage}
                        message={message}
                        scrollRef={scrollRef}
                    /> : 'Please, select your friend'
                }
                {/* End Right Side  */}
            </div>
        </div>
    );
};

export default Messenger;