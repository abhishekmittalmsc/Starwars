import React from 'react';
import Login from './Components/Login'
import Search from './Components/Search'
import { Route, BrowserRouter } from 'react-router-dom'



function App() {
  return (
    <BrowserRouter>
        <Route  exact path="/" component={Login}/>
        <Route exact path="/Search" component={Search}/> 
    </BrowserRouter>


    )
}

export default App;
