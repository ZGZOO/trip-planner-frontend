import React from "react";
import ListForm from "../../shared/ListForm/ListForm";
import axios from "axios";
import apiUrl from "../../../apiConfig";
import "./stopCard.scss";
import EditableText from "../../shared/EditableText/EditableText";

const StopCard = ({
  stop,
  setTrip,
  refreshTrip,
  tripId,
  reorder,
  first,
  last,
}) => {
  const removeStop = async () => {
    try {
      const tripData = await axios.delete(
        `${apiUrl}/trips/${tripId}/removeStop/${stop._id}`
      );
      setTrip(tripData.data.trip);
    } catch (err) {
      console.error("ERROR GETTING TRIPS", err);
    }
  };
  const updateStopName = async (name) => {
    try {
      const tripData = await axios.put(`${apiUrl}/stops/${stop._id}/`, {
        name: name,
      });
      refreshTrip();
    } catch (err) {
      console.error("ERROR UPDATING STOP NAME", err);
    }
  };
  const updateTodos = async (todos) => {
    try {
      const tripData = await axios.put(`${apiUrl}/stops/${stop._id}/`, {
        thingsToDo: todos,
      });
      refreshTrip();
    } catch (err) {
      console.error("ERROR UPDATING STOP NAME", err);
    }
  };
  const addToDo = (todo) => {
    const todoList = [...stop.thingsToDo, todo];
    updateTodos(todoList);
  };
  const removeTodo = (i) => {
    const todoList = [...stop.thingsToDo];
    todoList.splice(i, 1);
    updateTodos(todoList);
  };

  return (
    <div className="stop-card">
      <EditableText
        value={stop.name}
        className="stop-name"
        handleSubmit={updateStopName}
      />
      <div className="things-to-do">
        <ul>
          {stop.thingsToDo.map((el, i) => (
            <div className="list-item" key={i}>
              <span>{el}</span>
              <span className="remove-item" onClick={() => removeTodo(i)}>
                &times;
              </span>
            </div>
          ))}
        </ul>
        <ListForm placeholder="Add a plan" handleSubmit={addToDo} />
      </div>
      <span className="remove-stop" onClick={removeStop}>
        &times;
      </span>
      {!first ? (
        <span className="reorder-up" onClick={() => reorder("UP")}>
          &#10514;
        </span>
      ) : (
        ""
      )}
      {!last ? (
        <span className="reorder-down" onClick={() => reorder("DOWN")}>
          &#10515;
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default StopCard;
