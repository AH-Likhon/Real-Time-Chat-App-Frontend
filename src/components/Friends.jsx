import moment from 'moment';
import React from 'react';
import { BsCheck2All } from 'react-icons/bs';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { RiCheckboxCircleFill } from 'react-icons/ri';

const Friends = ({ friend, sms, myId }) => {

    let lsms = sms.filter((m => (m.senderId === myId && m.receiverId === friend._id) || (m.senderId === friend._id && m.receiverId === myId))).reverse()[0];

    // console.log(lsms);
    // console.log(friend);

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
                            lsms && lsms.senderId === myId ? <span>You</span> : <span>{lsms?.senderName}</span>
                        }

                        {
                            lsms && lsms?.message?.text ? <span>{lsms?.message?.text.slice(0, 10)}</span> : lsms?.message?.image ? <span>sent a image</span> : <span>connect you</span>
                        }

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
                                    <BsCheck2All />
                                </div> : <div className='unseen'>
                                    <HiOutlineCheckCircle />
                                </div>
                            }
                        </div> :
                        <div className='seen-unseen'>
                            <div className='seen-icon'></div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Friends;