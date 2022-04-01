import React, { useEffect, useState, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, messageSend, getMessage, imgMessageSend } from '../store/actions/messengerAction';

const Messenger = () => {

    const { friends, message } = useSelector(state => state.messenger);
    const { myInfo } = useSelector(state => state.auth);

    const myFriends = friends.filter(friend => friend.email !== myInfo.email);
    // console.log(myFriends);

    const [currentFrnd, setCurrentFrnd] = useState('');
    // console.log(currentFrnd);

    const [newMessage, setNewMessage] = useState('');
    const [sendImage, setSendImage] = useState('');
    const [activeUser, setActiveUser] = useState([]);

    const scrollRef = useRef();
    const socket = useRef();

    console.log(socket);

    useEffect(() => {
        socket.current = io('ws://localhost:8000');
    }, []);

    useEffect(() => {
        socket.current.emit('addUser', myInfo.id, myInfo)
        // console.log(myInfo)
    }, []);

    useEffect(() => {
        socket.current.on('getUser', users => {
            const filterUsers = users.filter(user => user.userId !== myInfo.id);
            console.log(filterUsers);
            setActiveUser(filterUsers);
        })
    }, [])



    const dispatch = useDispatch();

    const handleInput = e => {
        setNewMessage(e.target.value);
        // setSendImage('');
    }

    const imageSend = e => {
        if (e.target.files.length !== 0) {
            const imageName = e.target.files[0].name;
            const newImageName = Date.now() + imageName;
            console.log(newImageName);
            // setSendImage(imageName);
            // setNewMessage('');

            const reader = new FileReader();

            reader.onload = () => {
                setSendImage(reader.result);
            }

            reader.readAsDataURL(e.target.files[0]);

            // const formData = new FormData();
            // formData.append('senderId', myInfo.id);
            // formData.append('senderName', myInfo.userName);
            // formData.append('receiverId', currentFrnd._id);
            // formData.append('image', e.target.files[0]);
            // formData.append('imageName', newImageName);

            // dispatch(imgMessageSend(formData));
            console.log(sendImage);

            const data = {
                senderId: myInfo.id,
                senderName: myInfo.userName,
                receiverId: currentFrnd._id,
                message: '',
                image: sendImage
            };

            dispatch(imgMessageSend(data));
        }
    }

    const sendMessage = e => {
        e.preventDefault();
        // console.log(newMessage);
        const data = {
            senderId: myInfo.id,
            senderName: myInfo.userName,
            receiverId: currentFrnd._id,
            message: newMessage ? newMessage : '❤️',
            image: sendImage
        };

        dispatch(messageSend(data));

        console.log(data);
    }

    const emojiSend = emoji => {
        setNewMessage(`${newMessage}` + emoji);
        // setSendImage('');
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
                            {
                                activeUser && activeUser.length > 0 ? activeUser.map(user => <ActiveFriend user={user} setCurrentFrnd={setCurrentFrnd} />) : ''
                            }
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
                        emojiSend={emojiSend}
                        imageSend={imageSend}
                        activeUser={activeUser}
                    /> : 'Please, select your friend'
                }
                {/* End Right Side  */}
            </div>
        </div>
    );
};

export default Messenger;