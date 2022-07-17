import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { BsCheck2All } from 'react-icons/bs';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const Friends = ({ friend, sms, myId }) => {

    let lsms = sms.filter((m => (m.senderId === myId && m.receiverId === friend._id) || (m.senderId === friend._id && m.receiverId === myId))).slice(-1)[0];

    // const [allMessage, setAllMessage] = useState([])

    // // const response = 

    // useEffect(() => {
    //     setTimeout(() => {
    //         fetch("http://localhost:5000/get-message")
    //             .then(res => res.json())
    //             .then(data => setAllMessage(data.getAllMessage));
    //     }, 1000)
    // }, []);

    // let lsms = {};

    // if (allMessage && allMessage.length >= 0) {
    // let lsms = allMessage?.filter((m => (m.senderId === myId && m.receiverId === friend._id) || (m.senderId === friend._id && m.receiverId === myId)));
    // };
    // console.log(allMessage);
    // console.log(lsms);
    // console.log(friend);
    // console.log(senderName)

    return (
        <div className="friend">
            <div className="friend-image">
                <div className="image">
                    <img src={friend.image} alt="" />
                </div>
            </div>

            <div className='friend-name-seen'>
                <div className="friend-name">
                    <h4>{friend?.userName}</h4>
                    <div className='sms-time'>
                        {
                            lsms && lsms.senderId === myId ? <span>You: sent</span> : lsms !== undefined ? <span>{lsms?.senderName.slice(0, 5)}: sent</span> : ""
                        }

                        {
                            lsms && lsms?.message?.text ? <span>{lsms?.message?.text.slice(0, 10)}</span> : lsms?.message?.image ? <span>sent a image</span> : <span>connected with you</span>
                        }
                        {/* {
                            lsms === undefined && !lsms?.message?.text && !lsms?.message?.image ? <span>connected you</span> : ""
                        } */}

                        <span>
                            {lsms ? moment(lsms?.createdAt).startOf('mini').fromNow() : moment(friend?.registerTime).startOf('mini').fromNow()}
                        </span>
                    </div>
                </div>

                {
                    myId === lsms?.senderId ?
                        <div className='seen-unseen'>
                            {
                                lsms?.status === 'seen' ? <img src={friend.image} alt="" /> : lsms?.status === 'delivered' ? <div className='delivered'>
                                    <RiCheckboxCircleFill />
                                </div> : <div className='unseen'>
                                    <HiOutlineCheckCircle />
                                </div>
                            }
                        </div> :
                        <div className='seen-unseen'>
                            {/* <div className='seen-icon'></div> */}
                            {
                                lsms?.status !== undefined && lsms?.status !== 'seen' ? <div className='seen-icon'></div> : ''
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default Friends;