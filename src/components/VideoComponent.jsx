import React from 'react';
import PropTypes from 'prop-types';

function VideoComponent({ video }) {
  const url = video.replace('watch?v=', 'embed/');
  return (
    <iframe
      width="360"
      data-testid="video"
      height=""
      src={ url }
      title="YouTube video player"
      allow="accelerometer;
              autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    />
  );
}

VideoComponent.propTypes = {
  video: PropTypes.string,
}.isRequired;

export default VideoComponent;
