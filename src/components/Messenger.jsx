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
import { getFriends, messageSend, getMessage, imgMessageSend, seenSMS, deliveredSMS } from '../store/actions/messengerAction';

const Messenger = () => {

    const [notificationSPlay] = useSound(notification);
    const [sendingSPlay] = useSound(sending);

    const { friends, message } = useSelector(state => state.messenger);
    const { myInfo } = useSelector(state => state.auth);
    const [lastSMSList, setLastSMSList] = useState([]);


    const myFriends = friends?.filter(friend => friend.email !== myInfo.email);

    const [currentFrnd, setCurrentFrnd] = useState('');
    // const [allMessage, setAllMessage] = useState('');
    // console.log(currentFrnd);

    console.log('Last SMS:', message);


    // let lastSMS = message.slice(-1);

    let smsMessage = message?.filter((m => (m.senderId === myInfo.id && m.receiverId === currentFrnd._id) || (m.senderId === currentFrnd._id && m.receiverId === myInfo.id)));

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
    const [socketSeen, setSocketSeen] = useState("");
    const [typing, setTyping] = useState('');

    const scrollRef = useRef();
    const socket = useRef();


    // useEffect(() => {
    //     fetch('http://localhost:5000/get-message')
    //         .then(res => res.json())
    //         .then(data => {
    //             // setSocketMessage(data.getAllMessage);
    //             const getAllMessage = data.getAllMessage;
    //             // console.log(getAllMessage);
    //             setLastSMSList([...lastSMSList, getAllMessage]);
    //             // for (const singleFrnd of myFriends) {
    //             //     console.log(getAllMessage.filter((m => (m.senderId === myInfo.id && m.receiverId === singleFrnd._id) || (m.senderId === singleFrnd._id && m.receiverId === myInfo.id))));

    //             //     const lastSMS = getAllMessage.filter((m => (m.senderId === myInfo.id && m.receiverId === singleFrnd._id) || (m.senderId === singleFrnd._id && m.receiverId === myInfo.id))).reverse()[0];

    //             //     // console.log(lastSMS);
    //             //     // lastSMSList.push(lastSMS);

    //             //     
    //             // }
    //         })
    // }, []);

    // console.log(socketMessage);

    // console.log(socket);

    useEffect(() => {
        socket.current = io('ws://localhost:8000');
        socket.current.on('getMessage', data => {
            setSocketMessage(data);
            // setSocketSeen(data);
            // setSocketAllMessage([...socketAllMessage, data]);
            // console.log(socketAllMessage);
        })
        socket.current.on('seenSmsRes', data => {
            dispatch(seenSMS(data));
            // dispatch({
            //     type: 'SEEN_SMS',
            //     payload: {
            //         sms: data,
            //     }
        })
        // setSocketMessage(data);
        // dispatch(seenSMS(data));
        // });

        socket.current.on('deliveredSmsRes', data => {
            dispatch(deliveredSMS(data));
            // dispatch({
            //     type: 'DELIVERED_SMS',
            //     payload: {
            //         sms: data,
            //     }
            // })
        })

        socket.current.on('getTyping', (data) => {
            setTyping(data);
            // console.log(data);
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

            socket.current.emit('deliveredSMS', socketMessage);
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

            // const imageName = e.target.files[0].name;
            // const newImageName = Date.now() + imageName;
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

            // socket.current.emit('sendMessage', {
            //     senderId: myInfo.id,
            //     senderName: myInfo.userName,
            //     receiverId: currentFrnd._id,
            //     receiverName: currentFrnd.userName,
            //     message: '',
            //     // image: newImageName,
            //     image: url,
            //     time: new Date()
            // });


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

            let uid = new Date().getTime().toString(36) + Math.floor(new Date().valueOf() * Math.random());
            // let status = ' ';

            // if (socketMessage && currentFrnd) {
            //     if (socketMessage.senderId === currentFrnd._id && socketMessage.receiverId === myInfo.id) {
            //         status = 'seen';
            //     } else {
            //         status = 'delivered';
            //     }
            // } else {
            //     status = 'unseen'
            // }

            // console.log('status', status)

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
                // status: 'unseen',
                status: 'unseen',
            })

            dispatch(imgMessageSend(data));

            console.log(data);
        }
    }

    // setTimeout(imageSend, 5000);

    const sendMessage = e => {
        e.preventDefault();

        sendingSPlay();

        let uid = new Date().getTime().toString(36) + Math.floor(new Date().valueOf() * Math.random());

        // console.log(newMessage);


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
        })

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

        console.log(currentFrnd);
        // console.log('Check status:', myFriends && myFriends.includes(currentFrnd) ? 'seen' : myFriends && !myFriends.includes(currentFrnd) ? 'delivered' : 'unseen')
        // console.log('Check status:', currentFrnd && currentFrnd._id === currentFrnd._id ? 'seen' : currentFrnd && currentFrnd._id === myInfo.id ? 'delivered' : 'unseen')




        socket.current.emit('typing', {
            senderId: myInfo.id,
            receiverId: currentFrnd._id,
            message: ''
        })

        dispatch(messageSend(data));
        // dispatch(getMessage());

        setNewMessage('');


        console.log(data);
    }

    // useEffect(() => {
    //     fetch("http://localhost:5000/get-message")
    //         .then(res => res.json())
    //         .then(data => setLastSMSList(data.getAllMessage));
    // }, []);

    // console.log(lastSMSList);

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
        // console.log("Frnd ID:", currentFrnd._id, "My ID:", myInfo.id);
        dispatch(getMessage(currentFrnd._id, myInfo.id));

        // dispatch(seenSMS(socketSeen));
    }, [currentFrnd?._id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });

        // let smsLastOne = message.filter((m => (m.senderId === myInfo.id && m.receiverId === currentFrnd._id) || (m.senderId === currentFrnd._id && m.receiverId === myInfo.id))).slice(-1);
        // console.log(smsLastOne[0]);
        // dispatch(seenSMS(smsLastOne[0]));
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
                                    <Friends key={friend._id} sms={message} myId={myInfo.id} friend={friend} />
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