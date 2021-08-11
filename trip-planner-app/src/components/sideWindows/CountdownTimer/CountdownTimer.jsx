import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../../../apiConfig";
import "./CountdownTimer.scss";

const CountdownTimer = ({ match, departureDateBackend, setTrip }) => {
  // this is the user input
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // const [departureDate, setDepartureDate] = useState("");
  const [showCountdownInput, setShowCountdownInput] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => setRefresh(!refresh)

  useEffect(() => {
    getTimeUntil(departureDateBackend);
    setTimeout(() => {
      toggleRefresh()
    }, 1000);
  }, [refresh]);

  useEffect(() => {
    getTimeUntil(departureDateBackend);
  }, [departureDateBackend])

  const handleDateChange = (event) => {
    setInput(event.target.value);
  };


  const handleDateSubmit = (event) => {
    event.preventDefault();
    // user input is sent to backend
    addDeparture(input);
    // close the input form
    setShowCountdownInput(false);
    // clear the input
    setInput("");
  };

  // user input is sent to backend
  const addDeparture = async (date) => {
    let formattedDate = new Date(date);
    try {
      const response = await axios.put(
        `${apiUrl}/trips/${match.params.id}/updateDepartureDate`,
        { departureDate: formattedDate }
      );
      setTrip(response.data);
      console.log("added departure date: ", response.data.departureDate);
    } catch (err) {
      console.error("Invalid departure date sent to backend ", err);
    }
  };

  // now configured to get backend input to parse into timer
  const getTimeUntil = (inputTime) => {
    const time = Date.parse(inputTime) - Date.parse(new Date());
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    setTimer({
      days,
      hours,
      minutes,
      seconds,
    });
  };


  const toggleCountdownInput = () => {
    setShowCountdownInput(!showCountdownInput);
  };

  let displayDate = "";
  if (departureDateBackend) {
    const month = new Date(departureDateBackend).getMonth();
    const date = new Date(departureDateBackend).getDate();
    const year = new Date(departureDateBackend).getFullYear();
    // Not sure why the month is subtracting a number so had to add 1
    displayDate = `${month + 1}/${date}/${year}`;
    // console.log("displayDate: ", displayDate);
  }

  return (
    <div className="countdown-container">
      <button className="departure-button" onClick={toggleCountdownInput}>
        {departureDateBackend ? `Departure: ${displayDate}` : 'Set Departure Date'}
      </button>

      {departureDateBackend && timer.days ? ((timer.days <= 0 && timer.hours <= 0 && timer.minutes <= 0 && timer.seconds <= 0) ? (
        <div className="countdown-text">
          <p>Let's Go!</p>
        </div>
      ) : (
          <div className="countdown-clock">
            <span className="clock-days">{timer.days} days</span>
            <span className="clock-hours">{timer.hours} hrs</span>
            <span className="clock-minutes">{timer.minutes} min</span>
            <span className="clock-seconds">{timer.seconds} sec</span>
          </div>
        )) : ""}

      <div className={`timer-input ${showCountdownInput ? "visible" : ""}`}>
        <form onSubmit={handleDateSubmit}>
          <label htmlFor="date-input"></label>
          <input
            name="date-input"
            placeholder="mm/dd/yy"
            onChange={handleDateChange}
            value={input}
          ></input>
          <button className="timer-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CountdownTimer;
