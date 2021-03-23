import React, { useState } from 'react';
import { minutesToDuration, secondsToDuration } from '../utils/duration';
import classNames from '../utils/class-names';

const SessionRunning = (props) => {
  return (
    <div>
      {/* <span
          className={classNames({
            invisible: isSessionStopped,
            visible: !isSessionStopped,
          })}
        /> */}

      {/* TODO: This area should show only when a focus or break session is running or pauses */}

      <div className="row mb-2">
        <div className="col">
          {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">
            {props.sessionType === 'focus'
              ? //need to import inputFocusTimer so this doesn't countdown
                `Focusing for ${minutesToDuration(
                  props.inputFocusTime
                )} minutes`
              : `On Break for ${minutesToDuration(
                  props.inputBreakTime
                )} minutes`}
          </h2>
          {/* TODO: Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {props.sessionType === 'focus'
              ? secondsToDuration(props.focusTimer)
              : secondsToDuration(props.breakTimer)}{' '}
            remaining
          </p>
          <p
            className={classNames({
              invisible: props.isTimerRunning,
              visible: !props.isTimerRunning,
            })}
          >
            PAUSED
          </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: '20px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={
                props.sessionType === 'focus'
                  ? 100 - (props.focusTimer / (props.inputFocusTime * 60)) * 100
                  : 100 - (props.breakTimer / (props.inputBreakTime * 60)) * 100
              } // TODO: Increase aria-valuenow as elapsed time increases
              style={
                props.sessionType === 'focus'
                  ? {
                      width: `${
                        100 -
                        (props.focusTimer / (props.inputFocusTime * 60)) * 100
                      }%`,
                    }
                  : {
                      width: `${
                        100 -
                        (props.breakTimer / (props.inputBreakTime * 60)) * 100
                      }%`,
                    }
              } // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SessionRunning;