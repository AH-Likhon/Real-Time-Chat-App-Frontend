import React from 'react';
import myImage from '../images/image.jpg';
import { IoCall } from 'react-icons/io5';
import { BsCameraVideoFill } from 'react-icons/bs';
import { HiDotsCircleHorizontal } from 'react-icons/hi';
import Message from './Message';
import MessageSend from './MessageSend';

const RightSide = () => {
    return (
        <div className="col-9">
            <div className="right-side">
                <div className="row">
                    <div className="col-8">
                        <div className="message-send-show">
                            <div className="header">
                                <div className="image-name">
                                    <div className="image">
                                        <img src={myImage} alt="" />
                                        <div className="active-icon"></div>
                                    </div>
                                    <div className="name">
                                       <h3>Md. Akramul Hoque</h3>
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
                                        <HiDotsCircleHorizontal />
                                    </div>
                                </div>
                            </div>

                            {/* start message  */}
                            <Message />
                            <MessageSend />
                            {/* end message  */}
                        </div>
                    </div>

                    <div className="col-4">
                        <h1>Friend Information Section</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSide;