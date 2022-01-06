// import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/common/Home'
import Nav from './components/common/Nav'
import AboutUs from './components/common/AboutUs'
import Profile from './components/common/Profile'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import MapTest from './components/common/maps/MapTestPage'

function App() {
  return (
    // <h1>Hello World</h1>
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/aboutus"><AboutUs/></Route>
        <Route path="/profile"><Profile/></Route>
        <Route path="/register"><Register/></Route>
        <Route path="/login"><Login/></Route>
        <Route path="/maptest"><MapTest /></Route>

      </Switch>
    </BrowserRouter>
  )
}
export default App


