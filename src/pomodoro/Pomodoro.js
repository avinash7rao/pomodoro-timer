import React, { useState } from 'react';
import classNames from '../utils/class-names';
import { minutesToDuration, secondsToDuration } from '../utils/duration';
import useInterval from '../utils/useInterval';
import ChangeBreakTimer from './ChangeBreakTimer';
import ChangeFocusTimer from './ChangeFocusTimer';
import SessionRunning from './SessionRunning';

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  //Focus time starts at 25 minutes/1500 seconds
  const [focusTimer, setFocusTimer] = useState(1500);
  //Break time starts at 5 minutes/300 seconds
  const [breakTimer, setBreakTimer] = useState(300);
  //user inputted times for focus and break

  const [inputBreakTime, setInputBreakTime] = useState(5);
  const [inputFocusTime, setInputFocusTime] = useState(25);
  const [sessionType, setSessionType] = useState('focus');

  const [isSessionStopped, setIsSessionStopped] = useState(true);

  useInterval(
    () => {
      const audioEl = document.getElementsByClassName('audio-element')[0];

      if (sessionType === 'focus') {
        setBreakTimer(inputBreakTime * 60);
        setFocusTimer(Math.max(focusTimer - 1, 0));
        if (focusTimer === 0) {
          audioEl.play();
          setSessionType('break');
        }
      }

      if (sessionType === 'break') {
        setFocusTimer(inputFocusTime * 60);
        setBreakTimer(Math.max(breakTimer - 1, 0));
        if (breakTimer === 0) {
          audioEl.play();
          setSessionType('focus');
        }
      }
      // ToDo: Implement what should happen when the timer is running
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsSessionStopped(false);
    setIsTimerRunning((prevState) => !prevState);
  }

  function stopSession() {
    setIsTimerRunning(false);
    setIsSessionStopped(true);
    setFocusTimer(1500);
    setBreakTimer(300);
    setInputBreakTime(5);
    setInputFocusTime(25);
  }

  return (
    <div className="pomodoro">
      <audio className="audio-element">
        <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
      </audio>
      <div className="row">
        <div className="col">
          <ChangeFocusTimer
            setFocusTimer={setFocusTimer}
            setInputFocusTime={setInputFocusTime}
            inputFocusTime={inputFocusTime}
            isTimerRunning={isTimerRunning}
          />
        </div>
        <div className="col">
          <div className="float-right">
            <ChangeBreakTimer
              setBreakTimer={setBreakTimer}
              setInputBreakTime={setInputBreakTime}
              isTimerRunning={isTimerRunning}
              inputBreakTime={inputBreakTime}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  'oi-media-play': !isTimerRunning,
                  'oi-media-pause': isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={stopSession}
              disabled={!isTimerRunning}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {isSessionStopped ? null : (
          <SessionRunning
            inputFocusTime={inputFocusTime}
            inputBreakTime={inputBreakTime}
            focusTimer={focusTimer}
            breakTimer={breakTimer}
            sessionType={sessionType}
            isTimerRunning={isTimerRunning}
          />
        )}
      </div>
    </div>
  );
}

export default Pomodoro;
