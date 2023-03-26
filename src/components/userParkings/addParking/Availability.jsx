import { useState, useEffect } from "react";
import { warningPopup } from "../../../popup";


const MINUS_SIGN = "do_not_disturb_on"
const PLUS_SIGN = "add_circle"
export default function Availability(props) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [showTimeSlot, setShowTimeSlot] = useState(Array(7).fill(false));

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const getAvailability = () => {
    if (!props.availability) {
      return null;
    }
    let av = props.availability;
    return [
      av.Sunday,
      av.Monday,
      av.Tuesday,
      av.Wednesday,
      av.Thursday,
      av.Friday,
      av.Saturday,
    ];
  };
  const [availability, setAvailability] = useState(getAvailability());

  const handleSave = () => {
    props.setAvailability({
      Sunday: availability[0],
      Monday: availability[1],
      Tuesday: availability[2],
      Wednesday: availability[3],
      Thursday: availability[4],
      Friday: availability[5],
      Saturday: availability[6],
    });
    props.setWindow(false);
  };

  const handleAddTimeSlot = (index) => {
    if (!start || !end || end <= start) {
      warningPopup("", "Invalid Time");
      return;
    }
    if (availability[index].length === 1) {
      if (availability[index][0].end < start) {
        //higher
        setAvailability(
          availability.map((timeSlotsArr, i) =>
            i !== index
              ? timeSlotsArr
              : [...timeSlotsArr, { start: start, end: end }]
          )
        );
      } else if (availability[index][0].start > end) {
        // lower
        setAvailability(
          availability.map((timeSlotsArr, i) =>
            i !== index
              ? timeSlotsArr
              : [{ start: start, end: end }, ...timeSlotsArr]
          )
        );
      } else {
        setAvailability(
          availability.map((timeSlotsArr, i) =>
            i !== index
              ? timeSlotsArr
              : [
                  {
                    start:
                      start > availability[index][0].start
                        ? availability[index][0].start
                        : start,
                    end:
                      end < availability[index][0].end
                        ? availability[index][0].end
                        : end,
                  },
                ]
          )
        );
      }
    } else {
      setAvailability(
        availability.map((timeSlotsArr, i) =>
          i !== index
            ? timeSlotsArr
            : [{ start: start, end: end }]
        )
      );
    }
    setShowTimeSlot(Array(7).fill(false));
    setStart("");
    setEnd("");
  };

  if (!availability) {
    return <h1>error</h1>
  }
  return (
    <div className="availability-window">
      {days?.map((day, index) => (
        <div key={index} className="day">
          <h4>{day}:</h4>
          <div className="time-frame">
            {availability[index].map((timeFrame, i) => (
              <div key={i}>
                {timeFrame.start}-{timeFrame.end}
                {i === 0 && availability[index].length === 2 && (
                  <span className="comma">,</span>
                )}
              </div>
            ))}
          </div>
          {availability[index].length > 0 && (
            <span
              onClick={() =>
                setAvailability(
                  availability.map((timeSlotsArr, i) =>
                    i !== index ? timeSlotsArr : timeSlotsArr.slice(0, -1)
                  )
                )
              }
              className="add-time-frame material-symbols-outlined"
            >
              {MINUS_SIGN}
            </span>
          )}
          {!showTimeSlot[index] && availability[index].length < 2 && (
            <span
              onClick={() =>
                setShowTimeSlot(
                  showTimeSlot.map((b, i) => (i === index ? true : false))
                )
              }
              className="add-time-frame material-symbols-outlined"
            >
              {PLUS_SIGN}
            </span>
          )}
          {showTimeSlot[index] && (
            <div
            onKeyUpCapture={(e) => {
              if (e.key === "Enter") handleAddTimeSlot(index);
            }}
             className="add-time-slot">
              <div>
                <div>
                  <label htmlFor="start">Start</label>
                  <label htmlFor="end">End</label>
                </div>
                <input
                  id="start"
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
                <input
                  id="end"
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
              <div>
                <span
                  onClick={() => handleAddTimeSlot(index)}
                  className="material-symbols-outlined"
                >
                  save
                </span>
                <span
                  onClick={() => {
                    setStart("");
                    setEnd("");
                    setShowTimeSlot(Array(7).fill(false));
                  }}
                  className="material-symbols-outlined"
                >
                  cancel
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="btns">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => props.setWindow(false)}>Cancel</button>
      </div>
    </div>
  );
}
