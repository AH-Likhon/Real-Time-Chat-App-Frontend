import React from 'react';
import myImage from '../images/image.jpg';

const Friends = () => {
    return (
        <div className="friend">
            <div className="friend-image">
                <div className="image">
                    <img src={myImage} alt="" />
                </div>
            </div>

            <div className="friend-name">
                <h4>Md. Akramul Hoque</h4>
            </div>
        </div>
    );
};

export default Friends;