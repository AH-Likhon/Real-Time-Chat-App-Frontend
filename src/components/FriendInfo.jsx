import React from 'react';
import { BsChevronDown } from 'react-icons/bs';

const FriendInfo = (props) => {
    const { currentFrnd, activeUser, message } = props;
    // console.log(message);

    return (
        <div className="friend-info">
            <input type="checkbox" id="gallery" />
            <div className="image-name">
                <div className="image">
                    <img src={currentFrnd.image} alt="" />
                </div>
                {
                    activeUser && activeUser.length > 0 && activeUser.some(user => user.userId === currentFrnd._id) ? <div className="active-user"> Active </div> : ''
                }
                <div className="name">
                    <h4>{currentFrnd.userName}</h4>
                </div>
            </div>

            <div className="others">
                <div className="custom-chat">
                    <h4>Customise Chat</h4>
                    <BsChevronDown />
                </div>
                <div className="privacy">
                    <h4>Privacy and Support</h4>
                    <BsChevronDown />
                </div>
                <div className="media">
                    <h4>Shared Media</h4>
                    <label htmlFor="gallery">
                        <BsChevronDown />
                    </label>
                </div>
            </div>

            <div className="gallery">
                {
                    message && message.length > 0 ? message.map((m, index) => m.message.image && <img key={index} src={m.message.image} alt="" />) : ''
                }
            </div>
        </div>
    );
};

export default FriendInfo;