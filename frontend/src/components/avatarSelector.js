import React, { useState } from 'react';

const AvatarSelector = ({ avatars, onSelect }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleAvatarSelect = (selectedAvatar) => {
    onSelect(selectedAvatar);
    setModalTitle('Avatar Changed');
    setModalMessage('Your avatar has been changed successfully!');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const ModalProfile = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <p className="mb-6">{message}</p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-red-600 px-4 py-2 rounded text-white"
              onClick={onClose}
            >
              okay! 👍
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 justify-center">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            onClick={() => handleAvatarSelect(avatar)}
            className="w-12 h-12 object-cover rounded-full cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
          />
        ))}
      </div>

      <ModalProfile
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};

export default AvatarSelector;
