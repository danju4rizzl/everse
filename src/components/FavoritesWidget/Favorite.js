import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { MdDoNotDisturbOn } from 'react-icons/md';

const Favorite = ({ name, url, bgColor, onDelete }) => {
  const favoriteLabel = name.slice(0, 2).toUpperCase();

  const fadeInAnimation = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <Router>
      <animated.div
        className="favorites__item-container"
        style={fadeInAnimation}
      >
        <Link
          style={{
            backgroundColor: bgColor,
            boxShadow: `-2px 2px 2px rgba(${bgColor},0.6),-2px 2px 2px rgba(${bgColor},0.6)`,
          }}
          className="favorites__item"
          title={name.toUpperCase()}
          to={{ pathname: `${url}` }}
          target="_blank"
        >
          {favoriteLabel}
          <span className="favorites__delete">
            <MdDoNotDisturbOn onClick={onDelete} />
          </span>
        </Link>
      </animated.div>
    </Router>
  );
};

export default Favorite;
