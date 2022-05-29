import './App.css';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { useState } from 'react';

//partials
import Header from './partials/header/header'

// screens
import SigninScreen from './pages/singin/signinScreen';
import SignupScreen from './pages/signup/singupScreen';
import ConfigScreen from './pages/config/configScreen';

// components
function App() {
  const [ token, setToken ] = useState(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <div className='grid-contaier'>
        <Header />
        <main className='main'>
          <div className='content'>
            <Routes>
              <Route path="/" exact={true} element={<div className="App"></div>}></Route>
              <Route path='/signin'  exact={true} element={token ? <div>Home</div> : <SigninScreen/>}></Route>
              <Route path='/signup'  exact={true} element={token ? <div>Home</div> : <SignupScreen/>}></Route>
              <Route path='/config'  exact={true} element={token ? <ConfigScreen/> : <Navigate to="/signin"/>}></Route>
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
