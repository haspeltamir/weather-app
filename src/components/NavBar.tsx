// import { HStack, Image, Text } from '@chakra-ui/react';
import { HStack, Text } from '@chakra-ui/react';
import { Fragment, ReactNode } from 'react';
// import logo from '../../assets/Logo/logo.webp';
import ChangeColorMode from './ChangeColorMode';
interface Props {
    item?: string;
    children?: ReactNode
}

// const NavBar = (props: Props) => {
function NavBar(
    {
        item = ``,
    }: Props) {
    return (
        <Fragment>
            <div>
                {item}
            </div>

            {/* We use horizontal stack Because we want to have a switch,
            And next to it, a label.  */}
            <HStack justifyContent={"space-between"} p={10} bg="gray.200"
            >

                {/* <Image src={logo} alt="logo" boxSize="60px" /> */}

                {/* <Image src="https://via.placeholder.com/150" alt="placeholder" /> */}
                <Text fontSize="2xl">My Game Shop</Text>

                {/* 
                add the ChangeColorMode component to the NavBar component on the right side of the logo.
                */}
                <ChangeColorMode />

            </HStack>
        </Fragment>
    )
}

export default NavBar;