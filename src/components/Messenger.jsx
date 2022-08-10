import React, { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useSound from 'use-sound';
import notification from '../audio/notification.mp3';
import sending from '../audio/sending.mp3';
import { FaEdit } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
// import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, messageSend, getMessage, imgMessageSend, seenSMS, deliveredSMS, updateSeenSMSRes, getTheme, themeSet } from '../store/actions/messengerAction';
import { IoLogOutOutline } from 'react-icons/io5';
import { userLogOut } from '../store/actions/authAction';

const Messenger = () => {

    const [notificationSPlay] = useSound(notification);
    const [sendingSPlay] = useSound(sending);

    const { friends, message, themeMode, add_new_user } = useSelector(state => state.messenger);
    const { myInfo } = useSelector(state => state.auth);
    // const [lastSMSList, setLastSMSList] = useState([]);
    const [darkMode, setDarkMode] = useState(true);

    // console.log('Check theme', themeMode);

    const myFriends = friends?.filter(friend => friend.email !== myInfo.email);

    const [currentFrnd, setCurrentFrnd] = useState('');
    // console.log(currentFrnd);

    // console.log('Last SMS:', message);


    // let lastSMS = message.slice(-1);

    let smsMessage = message?.filter((m => (m.senderId === myInfo.id && m.receiverId === currentFrnd._id) || (m.senderId === currentFrnd._id && m.receiverId === myInfo.id)));

    const dispatch = useDispatch();

    const [newMessage, setNewMessage] = useState('');
    const [sendImage, setSendImage] = useState('');
    const [activeUser, setActiveUser] = useState([]);
    const [socketMessage, setSocketMessage] = useState("");
    const [socketSeen, setSocketSeen] = useState("");
    const [typing, setTyping] = useState('');

    const scrollRef = useRef();
    const socket = useRef();

    // <-------------------------- Socket Connection --------------------------> //

    useEffect(() => {
        socket.current = io('https://fierce-bastion-47070.herokuapp.com');
        socket.current.on('getMessage', data => {
            setSocketMessage(data);
        })
        socket.current.on('seenSmsRes', data => {
            dispatch(seenSMS(data));
        })

        socket.current.on('deliveredSmsRes', data => {
            dispatch(deliveredSMS(data));
        });

        socket.current.on('updateSeenSMSRes', data => {
            dispatch(updateSeenSMSRes(data));
        });

        socket.current.on('getTyping', (data) => {
            setTyping(data);
            // console.log(data);
        });

        // socket.current.on('logoutUser', (userInfo) => {
        //     console.log(userInfo);
        //     dispatch(userLogOut(userInfo));
        // });

    }, []);

    useEffect(() => {
        socket.current.emit('addUser', myInfo.id, myInfo)
        // console.log(myInfo)
    }, []);

    useEffect(() => {
        socket.current.on('getUser', users => {
            const filterUsers = users.filter(user => user.userId !== myInfo.id);
            // console.log(filterUsers);
            setActiveUser(filterUsers);
        });

        socket.current.on('add_new_user', data => {
            dispatch({
                type: 'ADD_NEW_USER',
                payload: {
                    add_new_user: data
                }
            });
            dispatch(getFriends());
        })
    }, []);

    useEffect(() => {
        if (socketMessage && currentFrnd) {
            if (socketMessage.senderId === currentFrnd._id && socketMessage.receiverId === myInfo.id) {
                dispatch({
                    type: 'SOCKET_MESSAGE',
                    payload: {
                        message: socketMessage
                    }
                })

                // dispatch(seenSMS(socketMessage));

                socket.current.emit('seenSMS', socketMessage);
            }
        }

        setSocketMessage("");

    }, [socketMessage]);


    useEffect(() => {
        if (socketMessage && socketMessage.senderId !== currentFrnd._id && socketMessage.receiverId === myInfo.id) {
            notificationSPlay();
            toast.success(`${socketMessage.senderName} sent a new message`);

            // dispatch(deliveredSMS(socketMessage));
            setSocketSeen(socketMessage)

            dispatch(getMessage(currentFrnd._id, myInfo.id));

            socket.current.emit('deliveredSMS', socketMessage);
        }
    }, [socketMessage])


    // <----------------------- Handle Input For SMS Send -----------------------> //

    const handleInput = e => {
        setNewMessage(e.target.value);
        setSendImage('');

        socket.current.emit('typing', {
            senderId: myInfo.id,
            receiverId: currentFrnd._id,
            message: e.target.value
        })
    }

    // <-------------------------- Image Send SMS --------------------------> //

    const imageSend = e => {
        if (e.target.files.length !== 0) {
            sendingSPlay();

            // const imageName = e.target.files[0].name;
            // const newImageName = Date.now() + imageName;
            // console.log(newImageName);
            // setSendImage(imageName);
            setNewMessage('');

            const reader = new FileReader();

            // let loadImg;

            reader.onload = () => {
                // if (reader.result) {
                setSendImage(reader.result);
                console.log(sendImage);
                // }
            }
            reader.readAsDataURL(e.target.files[0]);

            console.log(sendImage);

            // const url = URL.createObjectURL(e.target.files[0]);
            // console.log(url);

            const formData = new FormData();
            formData.append('senderId', myInfo.id);
            formData.append('senderName', myInfo.userName);
            formData.append('receiverId', currentFrnd._id);
            formData.append('receiverName', currentFrnd.userName);
            formData.append('image', sendImage);
            // formData.append('image', url);
            // formData.append('imageName', newImageName);

            var newData = {};

            formData.forEach(function (value, key) {
                newData[key] = value;
            });

            // console.log(newData);

            // dispatch(imgMessageSend(formData));

            let uid = new Date().getTime().toString(36) + Math.floor(new Date().valueOf() * Math.random());

            const data = {
                uid,
                senderId: newData.senderId,
                senderName: newData.senderName,
                receiverId: newData.receiverId,
                receiverName: newData.receiverName,
                message: '',
                image: newData.image,
                status: 'unseen',
            };

            socket.current.emit('sendMessage', {
                uid,
                senderId: myInfo.id,
                senderName: myInfo.userName,
                receiverId: currentFrnd._id,
                receiverName: currentFrnd.userName,
                message: '',
                image: newData.image,
                time: new Date(),
                status: 'unseen',
            })

            dispatch(imgMessageSend(data));
            setSendImage('');
            // console.log(data);
        }
    }

    // <------------------------ SMS Send without Image -------------------------> //

    const sendMessage = e => {
        e.preventDefault();

        sendingSPlay();

        let uid = new Date().getTime().toString(36) + Math.floor(new Date().valueOf() * Math.random());

        // console.log(newMessage);

        // console.log(socketMessage);

        const data = {
            uid,
            senderId: myInfo.id,
            senderName: myInfo.userName,
            receiverId: currentFrnd._id,
            receiverName: currentFrnd.userName,
            message: newMessage ? newMessage : '❤️',
            image: '',
            status: 'unseen',
        };


        socket.current.emit('sendMessage', {
            uid,
            senderId: myInfo.id,
            senderName: myInfo.userName,
            receiverId: currentFrnd._id,
            receiverName: currentFrnd.userName,
            message: newMessage ? newMessage : '❤️',
            image: '',
            time: new Date(),
            status: 'unseen',
        });


        socket.current.emit('typing', {
            senderId: myInfo.id,
            receiverId: currentFrnd._id,
            message: ''
        })

        dispatch(messageSend(data));
        // dispatch(getMessage());

        setNewMessage('');


        // console.log(data);
    }

    // <------------------------------ Emoji SMS Send ---------------------------> //

    const emojiSend = emoji => {
        setNewMessage(`${newMessage}` + emoji);
        setSendImage('');

        socket.current.emit('typing', {
            senderId: myInfo.id,
            receiverId: currentFrnd._id,
            message: emoji
        })
    };

    // <----------------------------- Get All Friends ---------------------------> //

    useEffect(() => {
        dispatch(getFriends());
        // dispatch(getMessage(currentFrnd._id, myInfo.id));
        dispatch({
            type: 'ADD_NEW_USER_CLEAR'
        })
    }, [add_new_user]);


    // <-------------------------- Set Currend Friend --------------------------> //

    useEffect(() => {
        if (friends && friends.length > 0) {
            setCurrentFrnd(myFriends[0]);
        }
    }, [friends]);

    // <------------------------------ Get All Message --------------------------> //

    useEffect(() => {
        // console.log("Frnd ID:", currentFrnd._id, "My ID:", myInfo.id);
        dispatch(getMessage(currentFrnd._id, myInfo.id));

        if (socketSeen.senderId !== myInfo.id && socketSeen.status !== 'seen') {
            socket.current.emit('updateSeenSMS', socketSeen);
        }

    }, [currentFrnd?._id]);

    // <------------------ Scroll auto Top to Bottom SMS Section ----------------> //

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    // <------------------------------- Handle Logout ---------------------------> //

    const logOut = () => {
        dispatch(userLogOut(myInfo));
        socket.current.emit('logout', myInfo);
    }

    // <-------------------------- Load Theme White/Dark ------------------------> //

    useEffect(() => {
        dispatch(getTheme())
    }, []);


    // <-------------------------- Friend Search Section ------------------------> //

    const searchFrnd = e => {
        // console.log(e.target.value);

        const getFrndsClass = document.getElementsByClassName('hover-friend');
        const frndName = document.getElementsByClassName('search_frnd_name');

        for (let i = 0; i < getFrndsClass.length, i < frndName.length; i++) {
            let text = frndName[i].innerText.toLowerCase();
            if (text.indexOf(e.target.value.toLowerCase()) > -1) {
                getFrndsClass[i].style.display = '';
            } else {
                getFrndsClass[i].style.display = 'none'
            }
        }
    }

    return (
        <div className={themeMode === 'dark' ? 'messenger theme' : 'messenger'}>

            <Toaster
                position={'top-right'}
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '18px'
                    }
                }}
            />

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
                                <div className="icon" onClick={() => setDarkMode(!darkMode)}>
                                    <BsThreeDots />
                                </div>
                                <div className="icon">
                                    <FaEdit />
                                </div>
                                <div className={darkMode ? 'theme_logout' : 'theme_logout shown'}>
                                    <h3>Dark Mode</h3>
                                    <div className='on'>
                                        <label htmlFor='dark'>ON</label>
                                        <input onChange={(e) => dispatch(themeSet(e.target.value))} value="dark" type="radio" name='theme' id='dark' />
                                    </div>
                                    <div className='off'>
                                        <label htmlFor='white'>OFF</label>
                                        <input onChange={(e) => dispatch(themeSet(e.target.value))} value="white" type="radio" name='theme' id='white' />
                                    </div>
                                    <div onClick={logOut} className='logout'>
                                        <IoLogOutOutline /> LogOut
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="friend-search">
                            <div className="search">
                                <button> <BiSearch /> </button>
                                <input onChange={searchFrnd} type="text" placeholder='Search' className="form-control" />
                            </div>
                        </div>

                        {/* Start Active Friends */}
                        {/* <div className="active-friends">
                            {
                                activeUser && activeUser.length > 0 ? activeUser.map((user, index) => <ActiveFriend key={index} user={user} setCurrentFrnd={setCurrentFrnd} />) : ''
                            }
                        </div> */}
                        {/* End Active Friends */}

                        {/* Start Friends  */}
                        <div className="friends">
                            {/* active */}
                            {
                                myFriends && myFriends.length > 0 ? myFriends.map((friend, index) => <div key={index} onClick={() => setCurrentFrnd(friend)} className={currentFrnd._id === friend._id ? "hover-friend active" : "hover-friend"}>
                                    <Friends key={friend._id} activeUser={activeUser} sms={message} myId={myInfo.id} friend={friend} />
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
                        // message={message}
                        message={smsMessage}
                        scrollRef={scrollRef}
                        emojiSend={emojiSend}
                        imageSend={imageSend}
                        activeUser={activeUser}
                        typing={typing}
                    /> : 'Please, select your friend'
                }
                {/* End Right Side  */}
            </div>
        </div>
    );
};

export default Messenger;