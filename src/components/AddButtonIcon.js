import React from 'react';
import PropTypes from 'prop-types';
import { MdAddCircle } from 'react-icons/md';

const AddButtonIcon = ({ iconContainerStyles, isVisible, onAdd }) => {
  return (
    <div style={iconContainerStyles}>
      <button
        className="add-icon-button"
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
        onClick={onAdd}
      >
        <MdAddCircle />
      </button>
    </div>
  );
};

AddButtonIcon.propTypes = { isVisible: PropTypes.bool };

export default AddButtonIcon;
