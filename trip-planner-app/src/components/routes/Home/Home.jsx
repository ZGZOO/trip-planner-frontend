import React, { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../../../apiConfig";
import "../Home/home.scss";
import lax from 'lax.js';
import AddTrip from "../../homepageComponents/AddTrip/AddTrip";
import TripList from "../../homepageComponents/TripList/TripList";
import SearchTrip from "../../homepageComponents/SearchTrip/SearchTrip";

const Home = ({ history }) => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [deletedId, setDeletedId] = useState("");

  useEffect(() => {
    const initTripList = async () => {
      const alltrips = await getTrips();
      setFilteredTrips(alltrips);
    };
    // getTrips();
    initTripList();
  }, []);

  useEffect(() => {
    const refreshTripList = async () => {
      const alltrips = await getTrips();
      setFilteredTrips(filteredTrips.filter(el => el._id != deletedId));
    };
    if (deletedId) refreshTripList();
  }, [deletedId]);

  const getTrips = async () => {
    try {
      const tripData = await axios.get(`${apiUrl}/trips/`);
      console.log("Got Trips", tripData);
      setTrips(tripData.data.trips);
      return tripData.data.trips;
    } catch (err) {
      console.error("ERROR GETTING TRIPS", err);
    }
  };

  return (
    <div className="homepage">
      
      <section className="par">
        <img src="https://res.cloudinary.com/twin2052000/image/upload/v1595437035/bg_i0hsji.jpg" className="bkg lax" data-lax-scale="linger-300"></img>
        <img src="https://res.cloudinary.com/twin2052000/image/upload/v1595437030/moon_pwmxbm.png" className="moon lax" data-lax-preset="driftLeft-1500"></img>
        <img src="https://res.cloudinary.com/twin2052000/image/upload/v1595437025/mountain_bacq4s.png" className="mountain lax" data-lax-preset="eager-100"></img>
        <img src="https://res.cloudinary.com/twin2052000/image/upload/v1595437017/road_is7rol.png" className="road lax"></img>
        <h2 className="text lax" data-lax-scale="2 1, vh 0.5"
        data-lax-translate-y="0 0, vh 1000"
        data-lax-opacity="0 1, (vh*0.5) 0">BeTrippin</h2>
       </section>
       <br></br>
       <br></br>
       <section className="par2">
       <h2 className="trips1">Get Started!</h2>
       <h2 className="trips">Get Started!</h2>
       <br></br>
       <br></br>
       </section>
       <br></br>
       <br></br>


    <div className="mainhomepage">
      <div className="left">
        <AddTrip className="addtrip" history={history} />
        <SearchTrip
          className="searchtrip"
          trips={trips}
          setFilteredTrips={setFilteredTrips}
        />
      </div>
      <div className="right">
        <TripList
          className="triplist"
          history={history}
          trips={filteredTrips}
          getTrips={getTrips}
          setDeletedId={setDeletedId}
        />
      </div>

    </div>
  </div>
  );
};

export default Home;
