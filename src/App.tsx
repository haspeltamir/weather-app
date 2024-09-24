import WeatherForm from './components/WeatherForm';
import NavBar from './components/NavBar';
import { Grid, GridItem, Box } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav" "main"`
      }}
      templateColumns={{
        base: "1fr", // Full width for small screens
        lg: "1fr",  // Centered content for large screens
      }}
      gap={6} // Add space between rows
      p={6} // Add padding around the grid
      minH="100vh" // Full height of the viewport
      bgGradient="linear(to-r, blue.400, purple.500)" // Background gradient for the entire app
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <GridItem area="main">
        <Box
          width={{ xl: "100%", lg: "80%", md: "70%", base: "60%" }} // Responsive width, changing for larger screens
          mx="auto" // Center the box horizontally
          bg="white" // White background for the main section
          p={8} // Padding around the content
          boxShadow="lg" // Add shadow for a professional look
          borderRadius="md" // Slightly rounded corners
          maxW="100%" // Set maximum width to avoid stretching too much on very large screens
        >
          <WeatherForm />
        </Box>
      </GridItem>
    </Grid>
  );
}

export default App;



// import WeatherForm from './components/WeatherForm';
// import './App.css'
// import NavBar from './components/NavBar';
// import { Grid, GridItem, } from "@chakra-ui/react"
// function App() {
//   return (
//     < Grid
//       templateAreas={
//         {
//           base: `
//         "nav"
//         "main"
//         ` ,
//           // largeer than 1024px
//           lg: `
//             "nav"
//             "main"
//             `}
//       }
//       // templateColumns="200px 1fr"
//       templateColumns={{
//         base: "1fr", //if the screen is small, the column will take up the full width of the screen.
//         lg: "1fr"//if the screen is large, the first column will be 200 pixels wide, and the second column will take up the remaining space.
//       }}

//     // templateRows="100px 1fr 100px"
//     // gap={4}
//     >
//       <GridItem area={'nav'}>
//         <NavBar />
//       </GridItem>
//       <WeatherForm />
//     </Grid >
//   );
// }

// export default App;





// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
