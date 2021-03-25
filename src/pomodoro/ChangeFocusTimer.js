import React from 'react';
import { minutesToDuration } from '../utils/duration';

const ChangeFocusTimer = (props) => {
  //   const [inputFocusTime, setInputFocusTime] = useState(25);

  //increase FocusTime no more than 60 minutes
  const handleIncreaseFocusClick = () => {
    const newTime = Math.min(props.inputFocusTime + 5, 60);
    props.setInputFocusTime(newTime);
    props.setFocusTimer(newTime * 60);
  };
  //decrease FocusTime no less than 5 minutes
  const handleDecreaseFocusClick = () => {
    const newTime = Math.max(props.inputFocusTime - 5, 5);
    props.setInputFocusTime(newTime);
    props.setFocusTimer(newTime * 60);
  };

  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-focus">
        {/* TODO: Update this text to display the current focus session duration */}
        Focus Duration: {minutesToDuration(props.inputFocusTime)}
      </span>
      <div className="input-group-append">
        {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-focus"
          onClick={handleDecreaseFocusClick}
          disabled={props.isTimerRunning}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-focus"
          onClick={handleIncreaseFocusClick}
          disabled={props.isTimerRunning}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
};
export default ChangeFocusTimer;