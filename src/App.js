import './App.css';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { useState } from 'react';

//partials
import Header from './partials/header/header'

// screens
import SigninScreen from './pages/singin/signinScreen';
import SignupScreen from './pages/signup/singupScreen';
import ConfigScreen from './pages/config/configScreen';
import UploadScreen from './pages/upload/uploadScreen';
import HomeScreen from './pages/home/homeScreen';
import FilesScreen from './pages/files/filesScreen';
import FileScreen from './pages/file/fileScreen';

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
              <Route path="/" exact={true} element={<HomeScreen/>}></Route>
              <Route path='/signin'  exact={true} element={token ? <HomeScreen/> : <SigninScreen/>}></Route>
              <Route path='/signup'  exact={true} element={token ? <HomeScreen/> : <SignupScreen/>}></Route>
              <Route path='/config'  exact={true} element={token ? <ConfigScreen/> : <Navigate to="/signin"/>}></Route>
              <Route path='/upload'  exact={true} element={token ? <UploadScreen/> : <Navigate to="/signin"/>}></Route>
              <Route path='/file/:id' element={token ? <FileScreen/> : <Navigate to="/signin"/>}></Route>
              <Route path='/files'  exact={true} element={token ? <FilesScreen/> : <Navigate to="/signin"/>}></Route>
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
