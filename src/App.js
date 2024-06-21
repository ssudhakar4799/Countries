import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Countries from './Components/Countries/Countries';
import CountrieDetails from './Components/CountrieDetails/CountrieDetails';
import { initialState, reducer } from './Components/Context/State';
import { useReducer } from 'react';
import { Context } from './Components/Context/Contex';

// Theme context, default to light theme

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <><Context.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Countries/>}></Route>
          <Route path='/countrieDetails/:regionName' element={<CountrieDetails/>}></Route>
        </Routes>
      </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
