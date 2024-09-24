import { ChangeEvent, FormEvent, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Button, Checkbox, Spinner, Text, VStack, useColorModeValue } from '@chakra-ui/react';
/*
useDispatch is a hook provided by react-redux that allows you to dispatch(Send) actions to the Redux store.
useSelector is a hook provided by react-redux that allows you to extract data from the Redux store state.
*/
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
// import axios from 'axios';
import axios from 'axios';

// Import the necessary actions and selectors from the weatherSlice
// (i prefer to destructure the actions and selectors instead of importing the whole slice)
import {
    setCity,
    setLatitude,
    setLongitude,
    setUseCurrentLocation,
    fetchWeatherStart,
    fetchWeatherSuccess,
    fetchWeatherFailure,
    setLastSearchedCity,
    setTemperatureUnit
} from '../store/weatherSlice';

const WeatherForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { city, latitude, longitude, useCurrentLocation, loading, error, weatherData, userPreferences } = useSelector((state: RootState) => state.weather);

    // Theme-specific styles
    const formBg = useColorModeValue('white', 'gray.700');
    const inputBg = useColorModeValue('gray.100', 'gray.600');
    const textColor = useColorModeValue('gray.800', 'white');
    const buttonColor = useColorModeValue('blue.500', 'blue.300');

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
            const response = await axios.post(import.meta.env.VITE_SERVER_URL, {
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
        const lastCity = localStorage.getItem('lastSearchedCity');
        const unit = localStorage.getItem('temperatureUnit');
        if (lastCity) {
            dispatch(setCity(lastCity));
        }
        if (unit) {
            dispatch(setTemperatureUnit(unit as 'C' | 'F'));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('lastSearchedCity', city);
        localStorage.setItem('temperatureUnit', userPreferences.temperatureUnit);
    }, [city, userPreferences.temperatureUnit]);

    return (
        <form onSubmit={handleSubmit}>
            <VStack
                spacing={4}
                align="flex-start"
                bg={formBg}
                p={6}
                borderRadius="md"
                boxShadow="lg"
                width={{ xl: "100%", lg: "80%", md: "70%", base: "60%" }} // Responsive width for different screens
                mx="auto" // Center the form
                maxW="100%" // Set maximum width to avoid stretching too much on very large screens
            >
                {/* City Name Input */}
                <FormControl isRequired>
                    <FormLabel htmlFor="city" color={textColor}>City Name</FormLabel>
                    <Input
                        id="city"
                        name="city"
                        value={city}
                        onChange={handleChange}
                        placeholder="Enter city name"
                        disabled={useCurrentLocation}
                        focusBorderColor="blue.500"
                        bg={inputBg}
                        color={textColor}
                    />
                </FormControl>

                {/* Latitude and Longitude Inputs */}
                <FormControl>
                    <FormLabel htmlFor="latitude" color={textColor}>Latitude</FormLabel>
                    <Input
                        id="latitude"
                        name="latitude"
                        value={latitude}
                        onChange={handleChange}
                        placeholder="Enter latitude"
                        disabled={useCurrentLocation}
                        focusBorderColor="blue.500"
                        bg={inputBg}
                        color={textColor}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="longitude" color={textColor}>Longitude</FormLabel>
                    <Input
                        id="longitude"
                        name="longitude"
                        value={longitude}
                        onChange={handleChange}
                        placeholder="Enter longitude"
                        disabled={useCurrentLocation}
                        focusBorderColor="blue.500"
                        bg={inputBg}
                        color={textColor}
                    />
                </FormControl>

                {/* Use Current Location Checkbox */}
                <Checkbox
                    name="useCurrentLocation"
                    isChecked={useCurrentLocation}
                    onChange={handleChange}
                    colorScheme="blue"
                    color={textColor}
                >
                    Use Current Location
                </Checkbox>

                {/* Submit Button */}
                <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={loading}
                    loadingText="Fetching Weather"
                    width="full"
                    bg={buttonColor}
                    _hover={{ bg: useColorModeValue('blue.400', 'blue.500') }}
                >
                    Get Weather
                </Button>

                {/* Error Message */}
                {error && <Text color="red.500">{error}</Text>}

                {/* Loading Spinner */}
                {loading && (
                    <Spinner size="lg" />
                )}

                {/* Display Weather Data */}
                {weatherData && (
                    <Box mt={6} p={4} borderRadius="md" boxShadow="md" bg={inputBg} width="full">
                        <Text fontSize="lg" fontWeight="bold" color={textColor}>Weather Information</Text>
                        <Text color={textColor}>City: {weatherData.name}</Text>
                        <Text color={textColor}>Country: {weatherData.sys.country}</Text>
                        <Text color={textColor}>
                            Temperature: {userPreferences.temperatureUnit === 'C'
                                ? weatherData.main.temp
                                : (weatherData.main.temp * 9) / 5 + 32}{' '}
                            °{userPreferences.temperatureUnit}
                        </Text>
                        <Text color={textColor}>Condition: {weatherData.weather[0].description}</Text>
                        <Text color={textColor}>Humidity: {weatherData.main.humidity}%</Text>
                        <Text color={textColor}>Wind Speed: {weatherData.wind.speed} m/s</Text>
                    </Box>
                )}
            </VStack>
        </form>
    );
};

export default WeatherForm;


// import { ChangeEvent, FormEvent, useEffect } from 'react';
// /*
// useDispatch is a hook provided by react-redux that allows you to dispatch(Send) actions to the Redux store.
// useSelector is a hook provided by react-redux that allows you to extract data from the Redux store state.
// */
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../store/store';
// import axios from 'axios';

// // Import the necessary actions and selectors from the weatherSlice
// // (i prefer to destructure the actions and selectors instead of importing the whole slice)
// import {
//     setCity,
//     setLatitude,
//     setLongitude,
//     setUseCurrentLocation,
//     fetchWeatherStart,
//     fetchWeatherSuccess,
//     fetchWeatherFailure,
//     setLastSearchedCity,
//     setTemperatureUnit,
// } from '../store/weatherSlice';


// const WeatherForm = () => {
//     const dispatch = useDispatch<AppDispatch>();

//     // Destructure Redux state
//     const {
//         city,
//         latitude,
//         longitude,
//         useCurrentLocation,
//         loading,
//         error,
//         weatherData,
//         userPreferences
//     } = useSelector(
//         (state: RootState) => state.weather
//     );

//     // Handle input changes in the form
//     const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const { name, value, checked } = e.target;

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

//     // Handle form submission (API call)
//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         dispatch(fetchWeatherStart());

//         try {
//             const response = await axios.post(import.meta.env.VITE_SERVER_URL, {
//                 city,
//                 latitude,
//                 longitude,
//                 useCurrentLocation,
//             });
//             dispatch(fetchWeatherSuccess(response.data));
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

//     // useEffect to load user preferences from localStorage when the component mounts
//     useEffect(() => {
//         const lastCity = localStorage.getItem('lastSearchedCity'); // Load last searched city
//         const unit = localStorage.getItem('temperatureUnit'); // Load temperature unit (C or F)

//         if (lastCity) {
//             dispatch(setCity(lastCity)); // If last city exists in localStorage, set it in Redux state
//         }

//         if (unit) {
//             dispatch(setTemperatureUnit(unit as 'C' | 'F')); // If unit exists in localStorage, set it in Redux state
//         }
//     }, [dispatch]);

//     // useEffect to save user preferences to localStorage whenever city or temperature unit changes
//     useEffect(() => {
//         localStorage.setItem('lastSearchedCity', city); // Save last searched city to localStorage
//         localStorage.setItem('temperatureUnit', userPreferences.temperatureUnit); // Save temperature unit to localStorage
//     }, [city, userPreferences.temperatureUnit]);

//     return (
//         <div>
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

//             {/* Display loading spinner(I didn't do a real spinner, its just a massage) */}
//             {loading && <div className="spinner"><p>Loading weather data...</p></div>}

//             {/* Display weather data */}
//             {weatherData && (
//                 <div>
//                     <h2>Weather Information</h2>
//                     <h2>☂☀💧🔥☔</h2>
//                     <h3>Submitted by: Tamir Haspel</h3>
//                     <p>Country: {weatherData.sys.country}</p>
//                     <p>City: {weatherData.name}</p>
//                     {/* <p>Temperature: {weatherData.main.temp} °{userPreferences.temperatureUnit}</p> */}
//                     <p>Temperature: {userPreferences.temperatureUnit === 'C' ? weatherData.main.temp : (weatherData.main.temp * 9 / 5) + 32} °{userPreferences.temperatureUnit}</p>
//                     <p>Weather Condition: {weatherData.weather[0].description}</p>
//                     <p>Humidity: {weatherData.main.humidity}%</p>
//                     <p>Wind Speed: {weatherData.wind.speed} m/s</p>

//                 </div>
//             )}
//         </div>
//     );
// };

// export default WeatherForm;

