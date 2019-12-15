import React from "react";
import Home from './paginas/home'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

 function App() {
   
  
  return (
    <div className="App">

              <BrowserRouter>
              <Switch>           
                  <Route exact path="/home" component={Home} />          
                  <Redirect from="*" to="/home" />
              </Switch>
              </BrowserRouter>
         

       
      
    </div>
  );
}

export default App;
