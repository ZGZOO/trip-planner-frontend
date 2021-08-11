import React, { useState, useEffect } from "react";
import PackingList from "../../sideWindows/PackingList/PackingList";
import SuitcaseButton from "../../sideWindows/PackingList/SuitcaseButton";
import CountdownTimer from "../../sideWindows/CountdownTimer/CountdownTimer";
import Map from "../../gMapsComponents/Map/Map";
import LocationSearch from "../../gMapsComponents/LocationSearch/LocationSearch";
import axios from "axios";
import apiUrl from "../../../apiConfig";
import "./TripPage.scss";
import StopList from "../../stopComponents/StopList/StopList";
import { haversineDistance } from "../../../utils";
import EditableText from "../../shared/EditableText/EditableText";

const TripPage = ({ match }) => {
    const [packingListOpen, setPackingListOpen] = useState(false);
    const [stops, setStops] = useState([]);
    const [trip, setTrip] = useState({});

    useEffect(() => {
        refreshTrip();
    }, []);

  const refreshTrip = async () => {
    try {
      const tripData = await axios.get(`${apiUrl}/trips/${match.params.id}`);
      console.log("Got Trip", tripData);
      setTrip(tripData.data.trip);
    } catch (err) {
      console.error("ERROR GETTING TRIPS", err);
    }
  };

    const handleSuitcaseButton = () => {
        setPackingListOpen(!packingListOpen);
    };

    const getBestStopIndex = (stop) => {
        //If there are less than 2 trips than we are still initializing origin and destination
        //so we can just add to the end of the array
        if (trip.stops.length < 2) return -1;

        //Find the closest existing stop
        const closest = { distance: null, index: 0 };
        const distances = trip.stops.map((el, i) => {
            const distance = haversineDistance(el, stop);
            if (!closest.distance) {
                closest.distance = distance;
            } else if (distance < closest.distance) {
                closest.distance = distance;
                closest.index = i;
            }
            return distance;
        });
        //Check if stop is closest to origin or destination
        if (closest.index === 0) {
            return 1;
        } else if (closest.index === trip.stops.length - 1) {
            return trip.stops.length - 1;
        } else {
            //Choose wich side of closest stop to put the new stop based on which neighbor it is closest to
            if (distances[closest.index - 1] < distances[closest.index + 1]) {
                //stop should be placed before closest existing stop
                return closest.index;
            } else {
                //stop should be placed after closest existing stop
                return closest.index + 1;
            }
        }
    };

    const addStop = async (stop) => {
        try {
            const index = getBestStopIndex(stop);
            const tripData = await axios.put(
                `${apiUrl}/trips/${match.params.id}/addStop/${index}`,
                stop
            );
            setTrip(tripData.data.trip);
        } catch (err) {
            console.error("ERROR GETTING TRIPS", err);
        }
    };

    const updateTitle = async title => {
        try {
            const tripData = await axios.put(`${apiUrl}/trips/${match.params.id}/`, { name: title });
            refreshTrip()
        } catch (err) {
            console.error('ERROR UPDATING TITLE', err);
        }
    }


    let showPackingList = null;
    if (packingListOpen) {
        showPackingList = (
            <PackingList
                match={match}
                packingListData={trip.packingList}
                setTrip={setTrip}
            />

        )
    };
    return (
        <div className="trip-page">
            <EditableText value={trip.name} className='title' handleSubmit={updateTitle} />
            <SuitcaseButton
                suitcaseClickHandler={handleSuitcaseButton}
                packingListData={trip.packingList}
            />
            <CountdownTimer
                match={match}
                departureDateBackend={trip.departureDate}
                setTrip={setTrip}
            />
            {showPackingList}
            <div className="google-container">
                {trip.stops ? (
                    <>
                        <LocationSearch addStop={addStop} numStops={trip.stops.length} />
                        <Map
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={
                                <div className='google-map' />
                            }
                            mapElement={<div style={{ height: `100%` }} />}
                            stops={trip.stops}
                        />
                    </>
                ) : (
                        <h2>Loading Map...</h2>
                    )}
                {trip.stops ? <StopList trip={trip} setTrip={setTrip} refreshTrip={refreshTrip} /> : ""}
            </div>
        </div>

    );
};

export default TripPage;
