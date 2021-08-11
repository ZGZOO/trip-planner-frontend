import React from 'react'
import StopCard from '../StopCard/StopCard'
import './stopList.scss'
import axios from 'axios'
import apiUrl from '../../../apiConfig'

const StopList = ({ trip, setTrip, refreshTrip }) => {

    const reorder = async (i, direction) => {
        const stops = trip.stops.map(el => el._id)
        let temp = stops[i];
        if (direction === 'UP') {
            stops[i] = stops[i - 1];
            stops[i - 1] = temp;
        } else if (direction === 'DOWN') {
            stops[i] = stops[i + 1];
            stops[i + 1] = temp;
        } else {
            throw "direction must be UP or DOWN"
        }
        try {
            const tripData = await axios.put(`${apiUrl}/trips/${trip._id}/`, { stops: stops });
            setTrip(tripData.data)
        } catch (err) {
            console.error('ERROR UPDATING STOPS', err);
        }
    }
    return (
        <div className="stop-list">
            {trip.stops.map((stop, i) =>
                <StopCard stop={stop}
                    tripId={trip._id}
                    setTrip={setTrip}
                    refreshTrip={refreshTrip}
                    reorder={(direction) => reorder(i, direction)}
                    first={i === 0}
                    last={i === trip.stops.length - 1}
                    key={i} />)}
        </div>
    )
}

export default StopList
