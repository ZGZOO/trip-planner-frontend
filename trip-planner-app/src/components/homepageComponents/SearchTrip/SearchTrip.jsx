import React from "react";
import "./searchTrip.scss";

const SearchTrip = ({ trips, setFilteredTrips }) => {
  const handleChange = (event) => {
    setFilteredTrips(
      trips.filter((trip) =>
        trip.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      event.target.searchbar.value = "";
      setFilteredTrips(trips);
    } catch (err) {
      console.error("Error Searching Trip:", err);
    }
  };

  return (
    <form className="search-trip" onSubmit={handleSubmit}>
      <input
        name="searchbar"
        type="text"
        placeholder="Search your trips"
        onChange={handleChange}
        className="searchbar"
      />
      <input type="submit" value="&times;" className="clearbutton" />
    </form>
  );
};

export default SearchTrip;
