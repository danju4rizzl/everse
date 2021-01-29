import React from 'react';
import PropTypes from 'prop-types';
import { MdAddCircle } from 'react-icons/md';

const AddButtonIcon = ({ isVisible, onAdd }) => {
  return (
    <button
      className="add-icon-button"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      onClick={onAdd}
    >
      <MdAddCircle />
    </button>
  );
};

AddButtonIcon.propTypes = { isVisible: PropTypes.bool };

export default AddButtonIcon;
