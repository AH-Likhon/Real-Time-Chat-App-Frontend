import React, { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useSound from 'use-sound';
import notification from '../audio/notification.mp3';
import sending from '../audio/sending.mp3';
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

    const [notificationSPlay] = useSound(notification);
    const [sendingSPlay] = useSound(sending);

    const { friends, message } = useSelector(state => state.messenger);
    const { myInfo } = useSelector(state => state.auth);
    const [lastSMSList, setLastSMSList] = useState([]);


    const myFriends = friends.filter(friend => friend.email !== myInfo.email);

    useEffect(() => {
        fetch('http://localhost:5000/get-message')
            .then(res => res.json())
            .then(data => {
                setLastSMSList(data.getAllMessage);
                // const getAllMessage = data.getAllMessage;
                // for (const singleFrnd of myFriends) {
                //     console.log(getAllMessage.filter((m => (m.senderId === myInfo.id && m.receiverId === singleFrnd._id) || (m.senderId === singleFrnd._id && m.receiverId === myInfo.id))).reverse()[0]);

                //     let lastSMS = getAllMessage.filter((m => (m.senderId === myInfo.id && m.receiverId === singleFrnd._id) || (m.senderId === singleFrnd._id && m.receiverId === myInfo.id))).reverse()[0];

                //     lastSMSList.push(lastSMS);

                //     // setLastSMSList([...lastSMSList, lastSMS]);
                // }
            })
    }, []);

    const [currentFrnd, setCurrentFrnd] = useState('');
    // console.log(currentFrnd);

    // console.log('Last SMS:', message.slice(-1));


    // let lastSMS = message.slice(-1);

    // if (friends && message) {
    //     const getLastSMS = (myId, frndId) => {
    //         let sms = message.filter((m => (m.senderId === myId && m.receiverId === frndId) || (m.senderId === frndId && m.receiverId === myId))).reverse()[0];

    //         return sms;
    //     }


    //     let frnd_sms = [];

    //     for (let i = 0; i < myFriends.length; i++) {
    //         let lsms = getLastSMS(myInfo.id, myFriends[i]._id);
    //         // console.log(lsms);
    //         if (lsms !== undefined) {
    //             frnd_sms = [...frnd_sms, lsms];
    //         }
    //         console.log(lsms);
    //     }

    //     console.log(frnd_sms);
    // }


    const dispatch = useDispatch();

    const [newMessage, setNewMessage] = useState('');
    // const [sendImage, setSendImage] = useState('');
    const [activeUser, setActiveUser] = useState([]);
    const [socketMessage, setSocketMessage] = useState("");
    const [typing, setTyping] = useState('');

    const scrollRef = useRef();
    const socket = useRef();


    // dispatch({
    //     type: LAST_SMS,
    //     payload: {
    //         lastSMS: lastSMS,
    //         // lastSMS: getLastMSG
    //     }
    // });

    console.log(socket);

    useEffect(() => {
        socket.current = io('ws://localhost:8000');
        socket.current.on('getMessage', data => {
            setSocketMessage(data);
        })

        socket.current.on('getTyping', (data) => {
            setTyping(data);
            console.log(data);
        })
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
            }
        }

        setSocketMessage("");

    }, [socketMessage]);


    useEffect(() => {
        if (socketMessage && socketMessage.senderId !== currentFrnd._id && socketMessage.receiverId === myInfo.id) {
            notificationSPlay();
            toast.success(`${socketMessage.senderName} sent a new message`);
        }
    }, [socketMessage])


    const handleInput = e => {
        setNewMessage(e.target.value);
        // setSendImage('');

        socket.current.emit('typing', {
            senderId: myInfo.id,
            receiverId: currentFrnd._id,
            message: e.target.value
        })
    }

    const imageSend = e => {
        if (e.target.files.length !== 0) {
            sendingSPlay();

            const imageName = e.target.files[0].name;
            const newImageName = Date.now() + imageName;
            // console.log(newImageName);
            // setSendImage(imageName);
            // setNewMessage('');

            // const reader = new FileReader();

            // let loadImg;

            // reader.onload = () => {
            //     setSendImage(reader.result);
            //     console.log(sendImage);
            // }

            // console.log(sendImage);

            const url = URL.createObjectURL(e.target.files[0]);
            console.log(url);

            socket.current.emit('sendMessage', {
                senderId: myInfo.id,
                senderName: myInfo.userName,
                receiverId: currentFrnd._id,
                receiverName: currentFrnd.userName,
                message: '',
                // image: newImageName,
                image: url,
                time: new Date()
            });

            // reader.readAsDataURL(e.target.files[0]);

            const formData = new FormData();
            formData.append('senderId', myInfo.id);
            formData.append('senderName', myInfo.userName);
            formData.append('receiverId', currentFrnd._id);
            formData.append('receiverName', currentFrnd.userName);
            formData.append('image', url);
            // formData.append('imageName', newImageName);

            var newData = {};

            formData.forEach(function (value, key) {
                newData[key] = value;
            });

            // console.log(newData);

            // dispatch(imgMessageSend(formData));

            const data = {
                senderId: newData.senderId,
                senderName: newData.senderName,
                receiverId: newData.receiverId,
                receiverName: newData.receiverName,
                message: '',
                image: newData.image
            };

            dispatch(imgMessageSend(data));

            console.log(data);
        }
    }

    // setTimeout(imageSend, 5000);

    const sendMessage = e => {
        e.preventDefault();

        sendingSPlay();

        // console.log(newMessage);
        const data = {
            senderId: myInfo.id,
            senderName: myInfo.userName,
            receiverId: currentFrnd._id,
            receiverName: currentFrnd.userName,
            message: newMessage ? newMessage : '❤️',
            image: ''
        };

        socket.current.emit('sendMessage', {
            senderId: myInfo.id,
            senderName: myInfo.userName,
            receiverId: currentFrnd._id,
            receiverName: currentFrnd.userName,
            message: newMessage ? newMessage : '❤️',
            image: '',
            time: new Date()
        })

        socket.current.emit('typing', {
            senderId: myInfo.id,
            receiverId: currentFrnd._id,
            message: ''
        })

        dispatch(messageSend(data));
        // setLastSMS(data.slice(-1));
        setNewMessage('');


        console.log(data);
    }

    const emojiSend = emoji => {
        setNewMessage(`${newMessage}` + emoji);
        // setSendImage('');

        socket.current.emit('typing', {
            senderId: myInfo.id,
            receiverId: currentFrnd._id,
            message: emoji
        })
    }



    useEffect(() => {
        dispatch(getFriends())
    }, []);

    useEffect(() => {
        if (friends && friends.length > 0) {
            setCurrentFrnd(myFriends[0]);
        }
    }, [friends]);

    useEffect(() => {
        console.log("Frnd ID:", currentFrnd._id, "My ID:", myInfo.id);
        dispatch(getMessage(currentFrnd._id, myInfo.id))
    }, [currentFrnd?._id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message])

    return (
        <div className="messenger">

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
                                activeUser && activeUser.length > 0 ? activeUser.map((user, index) => <ActiveFriend key={index} user={user} setCurrentFrnd={setCurrentFrnd} />) : ''
                            }
                        </div>
                        {/* End Active Friends */}

                        {/* Start Friends  */}
                        <div className="friends">
                            {/* active */}
                            {
                                myFriends && myFriends.length > 0 ? myFriends.map((friend, index) => <div onClick={() => setCurrentFrnd(friend)} className={currentFrnd._id === friend._id ? "hover-friend active" : "hover-friend"}>
                                    <Friends key={friend._id} sms={lastSMSList} myId={myInfo.id} friend={friend} />
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
                        typing={typing}
                    /> : 'Please, select your friend'
                }
                {/* End Right Side  */}
            </div>
        </div>
    );
};

export default Messenger;