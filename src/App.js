import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//partials
import Header from './partials/header/header'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" exact={true} element={<div className="App"></div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
