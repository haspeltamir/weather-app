Weather App Frontend

Introduction
Hello Bernard,

In this project, I am presenting the frontend of the weather app that I built. This web application allows users to search for and retrieve weather data for any city around the world. The app utilizes the OpenWeatherMap API to fetch real-time weather data, including current conditions like temperature, wind speed, humidity, and weather descriptions.

The frontend is built using React and Redux, ensuring smooth state management and efficient data flow within the application. It also features a responsive design built with Chakra UI, making it compatible with various devices from desktops to mobile phones.

Features
City Search: Users can enter the name of any city and retrieve weather information.
Current Location: Option to fetch weather data based on the user's current geolocation.
Dynamic Weather Data: Displays weather conditions such as temperature (in Celsius/Fahrenheit), wind speed, humidity, and sky condition.
Responsive Design: Optimized for both desktop and mobile devices.
Redux for State Management: State management with Redux for consistent, scalable data handling.
Getting Started
1.Installation Steps
  cd weather-app

  Once you're inside the project directory, you need to install the required dependencies using npm. Run the following command in the terminal:
    npm install
    
  Start the Application:
  To start the local development server, run:
    npm start dev


Tech Stack
The app is built with the following technologies:

React: JavaScript library for building user interfaces.
Redux: State management library.
Chakra UI: Component library for building responsive and accessible user interfaces.
Axios: HTTP client for making API requests.
React Router: For navigation and routing within the app.
API Used
The weather data is fetched using the OpenWeatherMap API. In order to get the app running properly, ensure that you have a valid OpenWeatherMap API key. Follow the instructions below to add your API key:

Create a .env file in the root directory of the project.

Add your API key in the .env file:

bash
Copy code
VITE_SERVER_URL=http://localhost:8000/api/weather/
Folder Structure
The project folder structure is organized as follows:

bash
Copy code
weather-frontend/
│
├── public/              # Static public assets
│
├── src/                 # Source files
│   ├── components/      # React components
│   ├── store/           # Redux store and reducers
│   ├── App.tsx          # Main App component
│   ├── index.tsx        # Main entry point
│   └── ...             
│
├── package.json         # Node dependencies and scripts
├── .env                 # Environment variables (API key)
├── README.md            # Project documentation
└── ...

Future Improvements
Unfortunately, I could not implement three days and 7 days forecast, Because It costs money, And not part of the free api(At least not the 7 days , The free api only gave up to 5. ).  

3-Day and 7-Day Forecast: Currently, the app only fetches current weather conditions. Future updates can include options for a 3-day and 7-day weather forecast.
User Authentication: In the future, user authentication may be added to allow users to save preferred locations.
Conclusion

This weather app frontend, built with React and Redux, provides a user-friendly interface to fetch and display weather data in real-time. With a responsive design and intuitive layout, it is designed to work seamlessly across all devices.

