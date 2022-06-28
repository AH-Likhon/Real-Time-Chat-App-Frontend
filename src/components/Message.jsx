import React from 'react';
import { useSelector } from 'react-redux';
// import image from "../../src/images/image.jpg"

const Message = ({ message, currentFrnd, scrollRef, typing }) => {
    const { myInfo } = useSelector(state => state.auth);

    return (
        <>
            <div className="message-show">
                {
                    message && message.length > 0 ? message.map(m =>
                        m.senderId === myInfo.id ?
                            <div ref={scrollRef} className="my-message">
                                <div className="image-message">
                                    <div className="my-text">
                                        <p className="message-text">
                                            {/* {
                                                m.message.image === '' ? m.message.text : <img src={m.message.image}></img>
                                            } */}
                                            {m.message.text === '' ? <img src={m.message.image} alt='image' /> : m.message.text}
                                        </p>
                                        {/* {
                                            m.message.image && m.message.image === '' ? <p className='message-text'>{m.message.text}</p> : <img src={m.message.image} alt="image" />
                                        } */}
                                    </div>
                                </div>

                                <div className="time">
                                    20 March 2022
                                </div>
                            </div>
                            :
                            <div ref={scrollRef} className="frnd-message">
                                <div className="image-message-time">
                                    <img src={currentFrnd.image} alt="" />

                                    <div className="message-time">
                                        <div className="frnd-text">
                                            {/* <p className="message-text">{m.message.text}</p> */}
                                            <p className='message-text'>
                                                {m.message.text === '' ? <img src={m.message.image} alt='image' /> : m.message.text}
                                            </p>
                                        </div>

                                        <div className="time">
                                            21 March 2022
                                        </div>
                                    </div>
                                </div>
                            </div>
                    ) : ''
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