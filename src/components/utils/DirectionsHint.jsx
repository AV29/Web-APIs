import React from 'react';
import arrows from '../../../assets/arrows.svg';
import './DirectionsHint.less';

const getDirections = (currentStep, totalSteps) => {
  if (currentStep === 0) {
    return ['down'];
  } else if (currentStep > 0 && currentStep < totalSteps) {
    return ['up', 'down'];
  } else {
    return ['up'];
  }
};

function DirectionsHint ({ currentStep, totalSteps }) {
  return (
    <div className={[...getDirections(currentStep, totalSteps), 'directionsHint'].join(' ')}>
      <span dangerouslySetInnerHTML={{ __html: arrows }}/>
    </div>
  );
}

export default DirectionsHint;
