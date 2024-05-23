import './App.css';

import FormDados from './Components/FormDados'

import {useEffect, useState} from 'react'



const url = 'http://localhost:3000/produtos';


function App() {
   return (
    <div className="App">
      <h1>estamos on !</h1>
      <FormDados/>
    </div>
  );
}

export default App;
