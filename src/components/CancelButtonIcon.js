import React from 'react';
import PropTypes from 'prop-types';
import { MdCancel } from 'react-icons/md';

const CancelButtonIcon = ({ isVisible, onCancel }) => {
  return (
    <button
      className="add-icon-button"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      onClick={onCancel}
    >
      <MdCancel />
    </button>
  );
};

CancelButtonIcon.propTypes = { isVisible: PropTypes.bool };

export default CancelButtonIcon;
