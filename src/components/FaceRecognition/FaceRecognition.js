import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center ma pt4 br3'>
      <div className='absolute mt2 br3'>
        <img className = 'br4' id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
        <div className='br4 bounding_box' style={{top: box.topRow, bottom: box.bottomRow, right: box.rightCol, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;
