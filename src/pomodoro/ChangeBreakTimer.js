import React from 'react';
import { minutesToDuration } from '../utils/duration';

//const [inputBreakTime, setInputBreakTime] = useState(5);
const ChangeBreakTimer = (props) => {
  //increase BreakTime no more than 15 minutes
  const handleIncreaseBreakClick = () => {
    const newTime = Math.min(props.inputBreakTime + 1, 15);
    props.setInputBreakTime(newTime);
    props.setBreakTimer(newTime * 60);
  };
  //decrease BreakTime no less than 1 minute
  const handleDecreaseBreakClick = () => {
    const newTime = Math.max(props.inputBreakTime - 1, 1);
    props.setInputBreakTime(newTime);
    props.setBreakTimer(newTime * 60);
  };
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-break">
        {/* TODO: Update this text to display the current break session duration */}
        Break Duration: {minutesToDuration(props.inputBreakTime)}
      </span>
      <div className="input-group-append">
        {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="decrease-break"
          onClick={handleDecreaseBreakClick}
          disabled={props.isTimerRunning}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="increase-break"
          onClick={handleIncreaseBreakClick}
          disabled={props.isTimerRunning}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
};
export default ChangeBreakTimer;