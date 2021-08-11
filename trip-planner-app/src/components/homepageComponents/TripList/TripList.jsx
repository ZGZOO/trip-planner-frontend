import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../../../apiConfig";
import "./tripList.scss";

const TripList = ({ history, trips, getTrips, setDeletedId }) => {
  const deleteTrip = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`${apiUrl}/trips/${id}`);
      setDeletedId(id)
      getTrips();
    } catch (err) {
      console.error("Failed to delete trip", err);
    }
  };

  const renderTrips = trips.map((el, i) => {
    return (
      <div
        key={i}
        className="trip-container"
        onClick={() => history.push(`/trip/${el._id}`)}
      >
        <div className="name-destination">
          <span>{el.name}</span>
          {el.stops[0] ? <span>{el.stops[el.stops.length - 1].name}</span> : ""}
        </div>
        <button onClick={(e) => deleteTrip(e, el._id)}>X</button>
      </div>
    );
  });

  return <div className="trip-list">{renderTrips}</div>;
};

export default TripList;
