
// /* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import axios from 'axios'; // Import Axios
import {
    setCity,
    setLatitude,
    setLongitude,
    setUseCurrentLocation,
    fetchWeatherStart,
    fetchWeatherSuccess,
    fetchWeatherFailure,
    setLastSearchedCity,
    setTemperatureUnit,
} from '../store/weatherSlice';

const WeatherForm = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Destructure Redux state
    const { city, latitude, longitude, useCurrentLocation, loading, error, weatherData, userPreferences } = useSelector(
        (state: RootState) => state.weather
    );

    // Handle input changes in the form
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        switch (name) {
            case 'city':
                dispatch(setCity(value));
                break;
            case 'latitude':
                dispatch(setLatitude(value));
                break;
            case 'longitude':
                dispatch(setLongitude(value));
                break;
            case 'useCurrentLocation':
                dispatch(setUseCurrentLocation(checked));
                break;
        }
    };

    // Handle form submission (API call)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(fetchWeatherStart());

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/weather/', {
                city,
                latitude,
                longitude,
                useCurrentLocation,
            });
            dispatch(fetchWeatherSuccess(response.data));
            dispatch(setLastSearchedCity(city)); // Save last searched city
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                dispatch(fetchWeatherFailure(error.message));
            } else if (error instanceof Error) {
                dispatch(fetchWeatherFailure(error.message));
            } else {
                dispatch(fetchWeatherFailure('An unknown error occurred'));
            }
        }
    };

    // useEffect to load user preferences from localStorage when the component mounts
    useEffect(() => {
        const lastCity = localStorage.getItem('lastSearchedCity'); // Load last searched city
        const unit = localStorage.getItem('temperatureUnit'); // Load temperature unit (C or F)

        if (lastCity) {
            dispatch(setCity(lastCity)); // If last city exists in localStorage, set it in Redux state
        }

        if (unit) {
            dispatch(setTemperatureUnit(unit as 'C' | 'F')); // If unit exists in localStorage, set it in Redux state
        }
    }, [dispatch]);

    // useEffect to save user preferences to localStorage whenever city or temperature unit changes
    useEffect(() => {
        localStorage.setItem('lastSearchedCity', city); // Save last searched city to localStorage
        localStorage.setItem('temperatureUnit', userPreferences.temperatureUnit); // Save temperature unit to localStorage
    }, [city, userPreferences.temperatureUnit]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="city">City Name:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        onChange={handleChange}
                        disabled={useCurrentLocation}
                    />
                </div>

                <div>
                    <label htmlFor="latitude">Latitude:</label>
                    <input
                        type="text"
                        id="latitude"
                        name="latitude"
                        value={latitude}
                        onChange={handleChange}
                        disabled={useCurrentLocation}
                    />
                </div>

                <div>
                    <label htmlFor="longitude">Longitude:</label>
                    <input
                        type="text"
                        id="longitude"
                        name="longitude"
                        value={longitude}
                        onChange={handleChange}
                        disabled={useCurrentLocation}
                    />
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="useCurrentLocation"
                            checked={useCurrentLocation}
                            onChange={handleChange}
                        />
                        Use Current Location
                    </label>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Get Weather'}
                </button>
                {error && <p>Error: {error}</p>}
            </form>

            {/* Display loading spinner */}
            {loading && <div className="spinner"><p>Loading weather data...</p></div>}

            {/* Display weather data */}
            {weatherData && (
                <div>
                    <h2>Weather Information</h2>
                    <h2>☂☀💧🔥☔</h2>
                    <h3>Submitted by: Tamir Haspel</h3>
                    <p>Country: {weatherData.sys.country}</p>
                    <p>City: {weatherData.name}</p>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Weather Condition: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>

                </div>
            )}
        </div>
    );
};

export default WeatherForm;




/**********************Working************* */
// // /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../store/store';
// import { ChangeEvent, FormEvent } from 'react';
// import axios from 'axios'; // Import Axios
// import {
//     setCity,
//     setLatitude,
//     setLongitude,
//     setUseCurrentLocation,
//     fetchWeatherStart,
//     fetchWeatherSuccess,
//     fetchWeatherFailure,
//     setLastSearchedCity,
// } from '../store/weatherSlice';

// const WeatherForm = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { city, latitude, longitude, useCurrentLocation, loading, error, weatherData } = useSelector(
//         (state: RootState) => state.weather
//     );

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;

//         switch (name) {
//             case 'city':
//                 dispatch(setCity(value));
//                 break;
//             case 'latitude':
//                 dispatch(setLatitude(value));
//                 break;
//             case 'longitude':
//                 dispatch(setLongitude(value));
//                 break;
//             case 'useCurrentLocation':
//                 dispatch(setUseCurrentLocation(checked));
//                 break;
//         }
//     };
//     // console.log(import.meta.env.VITE_SERVER_URL)
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         dispatch(fetchWeatherStart());

//         try {

//             // const response = await axios.post('http://127.0.0.1:8000/api/weather/', {
//             const response = await axios.post(import.meta.env.VITE_SERVER_URL
//                 , {
//                     city,
//                     latitude,
//                     longitude,
//                     useCurrentLocation,
//                 });
//             dispatch(fetchWeatherSuccess(response.data)); // Handle successful response
//             dispatch(setLastSearchedCity(city)); // Save last searched city
//         } catch (error: unknown) {
//             if (axios.isAxiosError(error)) {
//                 dispatch(fetchWeatherFailure(error.message));
//             } else if (error instanceof Error) {
//                 dispatch(fetchWeatherFailure(error.message));
//             } else {
//                 dispatch(fetchWeatherFailure('An unknown error occurred'));
//             }
//         }
//     };


//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="city">City Name:</label>
//                     <input
//                         type="text"
//                         id="city"
//                         name="city"
//                         value={city}
//                         onChange={handleChange}
//                         disabled={useCurrentLocation}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="latitude">Latitude:</label>
//                     <input
//                         type="text"
//                         id="latitude"
//                         name="latitude"
//                         value={latitude}
//                         onChange={handleChange}
//                         disabled={useCurrentLocation}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="longitude">Longitude:</label>
//                     <input
//                         type="text"
//                         id="longitude"
//                         name="longitude"
//                         value={longitude}
//                         onChange={handleChange}
//                         disabled={useCurrentLocation}
//                     />
//                 </div>

//                 <div>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="useCurrentLocation"
//                             checked={useCurrentLocation}
//                             onChange={handleChange}
//                         />
//                         Use Current Location
//                     </label>
//                 </div>

//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Loading...' : 'Get Weather'}
//                 </button>
//                 {error && (
//                     <div className="error">
//                         <p>There was an error fetching the weather data: {error}</p>
//                     </div>
//                 )}

//             </form>

//             {/* Display loading spinner */}
//             {loading && (
//                 <div className="spinner">
//                     <p>Loading weather data...</p>
//                 </div>
//             )}

//             {/* Display weather data */}
//             {weatherData && (
//                 <div>
//                     <h2>Weather Information</h2>
//                     <h2>☂☀💧🔥☔</h2>
//                     <h3>Submitted by: Tamir Haspel</h3>
//                     <p>Country: {weatherData.sys.country}</p>
//                     <p>City: {weatherData.name}</p>
//                     <p>Temperature: {weatherData.main.temp} °C</p>
//                     <p>Weather Condition: {weatherData.weather[0].description}</p>
//                     <p>Humidity: {weatherData.main.humidity}%</p>
//                     <p>Wind Speed: {weatherData.wind.speed} m/s</p>

//                     {/* Add more fields based on the response */}
//                 </div>
//             )}
//         </>
//     );
// };

// export default WeatherForm;


/****************BEST********************8/
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../store/store';
// import { ChangeEvent, FormEvent } from 'react';
// import axios from 'axios'; // Import Axios
// import {
//     setCity,
//     setLatitude,
//     setLongitude,
//     setUseCurrentLocation,
//     fetchWeatherStart,
//     fetchWeatherSuccess,
//     fetchWeatherFailure,
// } from '../store/weatherSlice';

// const WeatherForm = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { city, latitude, longitude, useCurrentLocation, loading, error, weatherData } = useSelector(
//         (state: RootState) => state.weather
//     );

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;

//         switch (name) {
//             case 'city':
//                 dispatch(setCity(value));
//                 break;
//             case 'latitude':
//                 dispatch(setLatitude(value));
//                 break;
//             case 'longitude':
//                 dispatch(setLongitude(value));
//                 break;
//             case 'useCurrentLocation':
//                 dispatch(setUseCurrentLocation(checked));
//                 break;
//         }
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         dispatch(fetchWeatherStart());

//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/weather/', {
//                 city,
//                 latitude,
//                 longitude,
//                 useCurrentLocation,
//             });
//             dispatch(fetchWeatherSuccess(response.data)); // Handle successful response
//         } catch (error: unknown) {
//             if (axios.isAxiosError(error)) {
//                 dispatch(fetchWeatherFailure(error.message));
//             } else if (error instanceof Error) {
//                 dispatch(fetchWeatherFailure(error.message));
//             } else {
//                 dispatch(fetchWeatherFailure('An unknown error occurred'));
//             }
//         }
//     };

//     return (
//         <>

//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="city">City Name:</label>
//                     <input
//                         type="text"
//                         id="city"
//                         name="city"
//                         value={city}
//                         onChange={handleChange}
//                         disabled={useCurrentLocation}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="latitude">Latitude:</label>
//                     <input
//                         type="text"
//                         id="latitude"
//                         name="latitude"
//                         value={latitude}
//                         onChange={handleChange}
//                         disabled={useCurrentLocation}
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="longitude">Longitude:</label>
//                     <input
//                         type="text"
//                         id="longitude"
//                         name="longitude"
//                         value={longitude}
//                         onChange={handleChange}
//                         disabled={useCurrentLocation}
//                     />
//                 </div>

//                 <div>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="useCurrentLocation"
//                             checked={useCurrentLocation}
//                             onChange={handleChange}
//                         />
//                         Use Current Location
//                     </label>
//                 </div>

//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Loading...' : 'Get Weather'}
//                 </button>
//                 {error && <p>Error: {error}</p>}
//             </form>

//             {
//                 weatherData && (
//                     <div>
//                         <h2>Weather Information</h2>
//                         <p>Country: {weatherData.sys.country}</p>
//                         <p>City: {weatherData.name}</p>
//                         <p>Temperature: {weatherData.main.temp} °C</p>
//                         <p>Condition: {weatherData.weather[0].description}</p>
//                         <p>Humidity: {weatherData.main.humidity}%</p>
//                         {/* Add more fields based on the response */}
//                     </div>
//                 )
//             }
//         </>
//     );
// };

// export default WeatherForm;








// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../store/store';
// import {
//     setCity,
//     setLatitude,
//     setLongitude,
//     setUseCurrentLocation,
//     fetchWeatherStart,
//     fetchWeatherSuccess,
//     fetchWeatherFailure,
// } from '../store/weatherSlice';

// const WeatherForm = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const { city, latitude, longitude, useCurrentLocation, loading, error } = useSelector(
//         (state: RootState) => state.weather
//     );

//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;

//         switch (name) {
//             case 'city':
//                 dispatch(setCity(value));
//                 break;
//             case 'latitude':
//                 dispatch(setLatitude(value));
//                 break;
//             case 'longitude':
//                 dispatch(setLongitude(value));
//                 break;
//             case 'useCurrentLocation':
//                 dispatch(setUseCurrentLocation(checked));
//                 break;
//         }
//     };

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         dispatch(fetchWeatherStart());

//         try {
//             const response = await axios.post('/weather/', {
//                 city,
//                 latitude,
//                 longitude,
//                 useCurrentLocation,
//             });
//             dispatch(fetchWeatherSuccess(response.data));
//         } catch (error: unknown) {
//             if (axios.isAxiosError(error)) {
//                 // If the error is from Axios, we can safely access the message
//                 dispatch(fetchWeatherFailure(error.message));
//             } else if (error instanceof Error) {
//                 // Handle generic errors
//                 dispatch(fetchWeatherFailure(error.message));
//             } else {
//                 // If it's an unknown type of error
//                 dispatch(fetchWeatherFailure('An unknown error occurred'));
//             }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor="city">City Name:</label>
//                 <input
//                     type="text"
//                     id="city"
//                     name="city"
//                     value={city}
//                     onChange={handleChange}
//                     disabled={useCurrentLocation}
//                 />
//             </div>

//             <div>
//                 <label htmlFor="latitude">Latitude:</label>
//                 <input
//                     type="text"
//                     id="latitude"
//                     name="latitude"
//                     value={latitude}
//                     onChange={handleChange}
//                     disabled={useCurrentLocation}
//                 />
//             </div>

//             <div>
//                 <label htmlFor="longitude">Longitude:</label>
//                 <input
//                     type="text"
//                     id="longitude"
//                     name="longitude"
//                     value={longitude}
//                     onChange={handleChange}
//                     disabled={useCurrentLocation}
//                 />
//             </div>

//             <div>
//                 <label>
//                     <input
//                         type="checkbox"
//                         name="useCurrentLocation"
//                         checked={useCurrentLocation}
//                         onChange={handleChange}
//                     />
//                     Use Current Location
//                 </label>
//             </div>

//             <button type="submit" disabled={loading}>
//                 {loading ? 'Loading...' : 'Get Weather'}
//             </button>
//             {error && <p>Error: {error}</p>}
//         </form>
//     );
// };

// export default WeatherForm;
