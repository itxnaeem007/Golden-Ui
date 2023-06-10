import React from "react";

const Timer = ({ days, hours, minutes, seconds}) => {

  const dateData = [
    {
      title: "Days",
      date: days,
    },
    {
      title: "Hours",
      date: hours,
    },
    {
      title: "Minutes",
      date: minutes,
    },
    {
      title: "Seconds",
      date: seconds,
    },
  ];

  return (
    <div className="text-white">
      <div className="d-flex">
        {dateData.map((val, i) => (
          <div key={i} className="text-center timeBox">
            <div className="innerBox">
            <div className="timetext">
              {val.date.toString().padStart(2, "0")}
            </div>
            <div className="font-bold timelabel">{val.title}</div>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timer;
