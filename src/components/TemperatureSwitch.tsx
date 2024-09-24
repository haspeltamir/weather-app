import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setTemperatureUnit } from '../store/weatherSlice';
import { Switch, Text, HStack } from '@chakra-ui/react';

const TemperatureSwitch = () => {
    const dispatch = useDispatch<AppDispatch>();
    const temperatureUnit = useSelector((state: RootState) => state.weather.userPreferences.temperatureUnit);

    const handleToggle = () => {
        const newUnit = temperatureUnit === 'C' ? 'F' : 'C';
        dispatch(setTemperatureUnit(newUnit));
    };

    return (
        <HStack align="center">
            <Text>Temperature Unit: {temperatureUnit}</Text>
            <Switch
                isChecked={temperatureUnit === 'F'}
                onChange={handleToggle}
                colorScheme="blue"
            />
        </HStack>
    );
};

export default TemperatureSwitch;
