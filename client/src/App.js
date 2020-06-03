import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import LayoutPage from './components/LayoutPage';
import FileManager from './components/FileManager';
import SubFolder from './components/SubFolder';
//import User1 from './components/context/User1'

function App() {
  return (
    
    <BrowserRouter>
      
     <LayoutPage/>
    
      <div className="App" >
      
        
        {/* <Route exact path="/" component={LayoutPage} /> */}
        <Route exact path="/" component={FileManager} />
        <Route path="/subfolder" component={SubFolder} />
        
    
 
      </div>
    </BrowserRouter>
   
  );
}

export default App;
