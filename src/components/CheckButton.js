import React from 'react';
import PropTypes from 'prop-types';
const CheckButton = ({ isChecked, onComplete }) => {
  return (
    <input
      className="form-check-input me-1 task__checkbox"
      type="checkbox"
      value={isChecked}
      checked={isChecked}
      aria-label="Completed"
      onChange={onComplete}
    ></input>
  );
};

CheckButton.propTypes = { onComplete: PropTypes.func.isRequired };
CheckButton.propTypes = { isChecked: PropTypes.bool };
export default CheckButton;
