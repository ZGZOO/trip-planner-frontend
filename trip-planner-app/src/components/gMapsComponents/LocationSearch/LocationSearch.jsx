import React from 'react'
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete'
import 'react-google-places-autocomplete/dist/index.min.css';
import "./LocationSearch.scss";

const LocationSearch = ({ addStop, numStops }) => {

    let placeholder = 'Add a Stop';
    switch (numStops) {
        case 0:
            placeholder = 'Add a Starting Location'
            break;
        case 1:
            placeholder = 'Add your Destination'
            break;
        default:
            break;
    }

    const setStop = async address => {
        try {
            const a = await geocodeByPlaceId(address.place_id);
            const latlng = await getLatLng(a[0])
            const stop = {
                ...latlng,
                name: address.structured_formatting.main_text
            }
            addStop(stop)
        } catch (err) {
            console.log('Failed to set Location', err)
        }
    }
    return (
        <div className="google-map-form">
            <GooglePlacesAutocomplete
                onSelect={setStop}
                placeholder={placeholder}
                displayFromSuggestionSelected={() => ''}
            />
        </div>
    )
}

export default LocationSearch
