import React from 'react';
import myImage from '../images/image.jpg';
import { IoCall } from 'react-icons/io5';
import { BsCameraVideoFill } from 'react-icons/bs';
import { HiDotsCircleHorizontal } from 'react-icons/hi';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';

const RightSide = (props) => {
    const { currentFrnd, newMessage, handleInput, sendMessage, message, scrollRef } = props;

    return (
        <div className="col-9">
            <div className="right-side">
                <input type="checkbox" id="dot" />
                <div className="row">
                    <div className="col-8">
                        <div className="message-send-show">
                            <div className="header">
                                <div className="image-name">
                                    <div className="image">
                                        <img src={currentFrnd.image} alt="" />
                                        <div className="active-icon"></div>
                                    </div>
                                    <div className="name">
                                        <h3>{currentFrnd.userName}</h3>
                                    </div>
                                </div>

                                <div className="icons">
                                    <div className="icon">
                                        <IoCall />
                                    </div>
                                    <div className="icon">
                                        <BsCameraVideoFill />
                                    </div>
                                    <div className="icon">
                                        <label htmlFor="dot">
                                            <HiDotsCircleHorizontal />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* start message  */}
                            <Message scrollRef={scrollRef} currentFrnd={currentFrnd} message={message} />
                            <MessageSend newMessage={newMessage} handleInput={handleInput} sendMessage={sendMessage} />
                            {/* end message  */}
                        </div>
                    </div>

                    <div className="col-4">
                        <FriendInfo key={currentFrnd._id} currentFrnd={currentFrnd} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSide;