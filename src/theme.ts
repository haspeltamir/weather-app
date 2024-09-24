/*
Customize The colors of the website. , To toggle between light and dark mode, you can use the following Steps:
*/
// step 1: create a new file called theme.ts in the src folder: My_Game_Shop/src/theme.ts
// step 2: Add the following code to the theme.ts file:

import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",

  // useSystemColorMode: false,
};

const theme = extendTheme({ config });

// step 3: export the theme object from the theme.ts file:
export default theme;

//step 4: import the theme object in the main.tsx file:
