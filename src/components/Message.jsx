import moment from 'moment';
import React from 'react';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const Message = ({ message, currentFrnd, scrollRef, typing }) => {
    const { myInfo } = useSelector(state => state.auth);

    // console.log(currentFrnd);
    // console.log(message.map(m => m));
    // console.log(message.map(m => m.message?.image));

    return (
        <>
            <div className="message-show">
                {
                    message && message.length > 0 ? message.map((m, index) =>
                        m.senderId === myInfo.id ?
                            <div key={index} ref={scrollRef} className="my-message">
                                <div className="image-message">
                                    <div className="my-text">
                                        <p className="message-text mine">

                                            {m.message.text === '' ? <img src={m.message?.image} alt='image' /> : m.message.text}

                                            {
                                                index === (message.length - 1) && m.senderId === myInfo.id ? m.status === 'seen' ? <img className='img' src={currentFrnd.image} alt="" /> : m.status === 'delivered' ? <span className='delivered'>
                                                    <RiCheckboxCircleFill />
                                                </span> : <span className='unseen'>
                                                    <HiOutlineCheckCircle />
                                                </span> : ''
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="time">
                                    {moment(m.createdAt).startOf('mini').fromNow()}
                                </div>
                            </div>
                            :
                            <div key={index} ref={scrollRef} className="frnd-message">
                                <div className="image-message-time">
                                    <img src={currentFrnd.image} alt="" />

                                    <div className="message-time">
                                        <div className="frnd-text">
                                            <p className='message-text frnd'>
                                                {m.message.text === '' ? <img src={m.message?.image} alt='image' /> : m.message.text}
                                            </p>
                                        </div>

                                        <div className="time">
                                            {moment(m.createdAt).startOf('mini').fromNow()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ) : <div className='friend_connect'>
                        <img src={currentFrnd.image} alt="" />
                        <h3>{currentFrnd.userName} connected with you</h3>
                        <span>{moment(currentFrnd.registerTime).startOf('mini').fromNow()}</span>
                    </div>
                }
            </div>

            {
                typing && typing.message && typing.senderId === currentFrnd._id ? <div className="typing-message">
                    <div className="frnd-message">
                        <div className="image-message-time">
                            <img src={currentFrnd.image} alt="" />
                            <div className="message-time">
                                <div className="frnd-text">
                                    <p className="message-text">Typing....</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ''
            }

        </>
    );
};

export default Message;