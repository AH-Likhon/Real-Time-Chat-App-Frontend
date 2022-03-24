import React from 'react';
import myImage from '../images/image.jpg';
import { BsChevronDown } from 'react-icons/bs';

const FriendInfo = (props) => {
    const { currentFrnd } = props;
    return (
        <div className="friend-info">
            <input type="checkbox" id="gallery" />
            <div className="image-name">
                <div className="image">
                    <img src={currentFrnd.image} alt="" />
                </div>
                <div className="active-user">
                    Active
                </div>
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
                <img src={myImage} alt="" />
                <img src={myImage} alt="" />
                <img src={myImage} alt="" />
                <img src={myImage} alt="" />
                <img src={myImage} alt="" />
                <img src={myImage} alt="" />
                <img src={myImage} alt="" />
                <img src={myImage} alt="" />
            </div>
        </div>
    );
};

export default FriendInfo;