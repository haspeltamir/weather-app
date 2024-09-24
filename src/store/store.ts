// import the configureStore function from the @reduxjs/toolkit package
/*
automatically Creates Redux Store instead of manually creating the store and adding the middleware.
*/
import { configureStore } from "@reduxjs/toolkit";

//importing the weatherSlice
/*
the weatherSlice Roll. Is to update the state every time a certain action Is being dispatched.
For example, when the user types in a city name, the setCity action is dispatched.

Note For myself (and others): 
  A reducer: 
    A Reducer Is a function that specifies how the state changes in response to actions sent to the store.
    it takes Two Arguments (the current state and an action) and returns a new state result. 
*/
import weatherReducer from "./weatherSlice";

//creating the store
/*
The store Is the object where the state of the application lives.
The store has the following responsibilities:
  - Holds application state;
  - Allows access to state via getState();
  - Allows state to be updated via dispatch(action);
  - Registers listeners via subscribe(listener);
  - Handles unregistering of listeners via the function returned by subscribe(listener).

in this case, the we added the weather Reducer under the weather key, so every time the weather action
is dispatched, the weatherReducer will be called(Every time the state of the weather changes,
It will change, according to the logic in the weatherReducer function). 
*/
const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
console.log("store", store);

/*
  RootState: Represents the structure of your state in Redux, and provides TypeScript with information 
  about what the state in your app looks like. 
  It helps you access data safely (Type-Safe).
  
  AppDispatch: Defines the type of the dispatch function in Redux, and ensures that you are sending 
  the correct actions to Redux to change the state.
*/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
