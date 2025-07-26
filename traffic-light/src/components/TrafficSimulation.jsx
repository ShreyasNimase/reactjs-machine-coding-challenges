import React, { useEffect, useState } from "react";
import "../components.css";

function TrafficSimulation() {
  const [activeColor, setActiveColor] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [counter, setCounter] = useState(0);
  const seq = [0, 2, 1];

  const lightSequence = [
    { color: "red", duration: 5 },
    { color: "yellow", duration: 2 },
    { color: "green", duration: 5 },
  ];
  const [currentSeq, setCurrentSeq] = useState(); // so after stop it should resume from timer where it stop

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    if (isRunning) {
      const current = currentSeq || lightSequence[currentIdx];
      setCurrentSeq(current);

      const { color, duration } = current;
      setActiveColor(color);
      setCounter(duration);

      //counter logic
      let countdown = duration;
      intervalId = setInterval(() => {
        countdown--;
        setCounter(countdown);
        //required condition to stop interval else infinite loop
        if (countdown == 0) {
          clearInterval(intervalId);
        }
      }, 1000);

      //schedule next light change
      timeoutId = setTimeout(() => {
        const nextIdx = currentIdx === 2 ? 0 : seq[currentIdx + 1];
        setCurrentIdx(currentIdx === 2 ? 0 : currentIdx + 1);
        // console.log(nextIdx);
        setCurrentSeq(lightSequence[nextIdx]);
      }, duration * 1000);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [isRunning, currentIdx]);

  const handleClick = (e) => {
    const { name } = e.target;
    if (name === "start") {
      setIsRunning(true);
    } else if (name === "stop") {
      setIsRunning(false);
      setCurrentSeq({ ...currentSeq, duration: counter });
    } else if (name === "reset") {
      setIsRunning(false);
      setCurrentIdx(0);
      setActiveColor("");
      setCounter(0);
      setCurrentSeq(undefined);
    }
  };

  return (
    <div className="container">
      <div className="titleName">
        <h1>Traffic Simulation</h1>
      </div>
      <div className="signal">
        {lightSequence.map((light, idx) => (
          <div
            key={light.color}
            style={{
              backgroundColor:
                activeColor === light.color ? light.color : "black",
            }}
          >
            {light.color + idx + currentIdx}
          </div>
        ))}

        {/* <div
          style={{
            backgroundColor: activeColor === "red" ? "red" : "black",
          }}
        ></div>
        <div
          style={{
            backgroundColor: activeColor === "yellow" ? "yellow" : "black",
          }}
        ></div>
        <div
          style={{
            backgroundColor: activeColor === "green" ? "green" : "black",
          }}
        ></div> */}
      </div>
      <div className="btn">
        <button name="start" value="red" onClick={handleClick}>
          Start
        </button>
        <button name="stop" onClick={handleClick}>
          Stop
        </button>
        <button name="reset" onClick={handleClick}>
          Reset
        </button>
      </div>
      <div className="info">
        <h2>
          Active : {activeColor} | {counter}sec remaining
        </h2>
      </div>
    </div>
  );
}

export default TrafficSimulation;
