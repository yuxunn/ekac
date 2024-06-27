import React from 'react';

const AvatarSelector = ({ avatars, onSelect }) => {
    const avatarStyle = {
        width: '50px',   
        height: '50px',  
        objectFit: 'cover', 
        borderRadius: '50%', 
        cursor: 'pointer', 
        transition: 'transform 0.3s ease' 
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',  
        gap: '10px',
        justifyContent: 'center'
    };

    return (
        <div style={gridStyle}>
            {avatars.map((avatar, index) => (
                <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    onClick={() => onSelect(avatar)}
                    style={avatarStyle}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
            ))}
        </div>
    );
};

export default AvatarSelector;
