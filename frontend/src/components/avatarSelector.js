import React from 'react';

const AvatarSelector = ({ avatars, onSelect }) => {
    return (
        <div className="avatar-selector">
            {avatars.map((avatar, index) => (
                <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    onClick={() => onSelect(avatar)}
                    className="avatar-image"
                />
            ))}
        </div>
    );
};

export default AvatarSelector;
