import React from 'react';
import { MdDelete } from 'react-icons/md';

const DeleteButtonIcon = ({ onDelete }) => {
  return (
    <div className="delete-icon-button">
      <MdDelete onClick={onDelete} />
    </div>
  );
};

export default DeleteButtonIcon;
