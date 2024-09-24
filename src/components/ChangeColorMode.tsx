/*
in order to change the color mode of the app in chakra ui, 
we need to use the ColorModeProvider component.
The ColorModeProvider component is a context provider that passes the color mode
value to all its children.

we can also use a Costum hook called "useColorMode" to change the color mode of the app.
*/

import { HStack, Switch, Text, useColorMode } from '@chakra-ui/react';
import { Fragment } from 'react';


// const ChangeColorMode = (props: Props) => {
function ChangeColorMode() {

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Fragment>
            <div>
            </div>
            <HStack>
                <Switch
                    colorScheme="teal"
                    size="lg"
                    isChecked={colorMode === 'dark'}
                    onChange={toggleColorMode}
                />
                <Text fontSize="2xl">{colorMode}</Text>
            </HStack>

        </Fragment>
    )
}

export default ChangeColorMode;