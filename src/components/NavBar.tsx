import { HStack, Text, Box } from '@chakra-ui/react';
import { Fragment } from 'react';
import ChangeColorMode from './ChangeColorMode';
import TemperatureSwitch from './TemperatureSwitch';

const NavBar = () => {
    return (
        <Fragment>
            <HStack
                justifyContent="space-between"
                alignItems="center"
                p={6} // Padding for the navbar
                bg="gray.800" // Dark background for contrast
                color="white" // Text color
                boxShadow="md" // Slight shadow for a floating effect
            >
                {/* Logo Section */}
                <Box>
                    <Text fontSize="xl" fontWeight="bold">Weather Dashboard</Text>
                </Box>

                {/* Mode Switches Section */}
                <HStack spacing={4}>
                    <ChangeColorMode />
                    <TemperatureSwitch />
                </HStack>
            </HStack>
        </Fragment>
    );
};

export default NavBar;
