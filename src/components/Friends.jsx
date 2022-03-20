import React from 'react';
import myImage from '../images/image.jpg';

const Friends = ({friend}) => {
    // console.log(friend.image);

    return (
        <div className="friend">
            <div className="friend-image">
                <div className="image">
                    <img src={friend.image} alt="" />
                </div>
            </div>

            <div className="friend-name">
                <h4>{friend?.userName}</h4>
            </div>
        </div>
    );
};

export default Friends;