import React from "react";
import { Switch,Route } from 'react-router-dom'
import Main from "./Component/Main";
import Personalroom from './Component/Personalroom'
import Transfer from './Component/Transfer.js'
import Regist from "./Component/Registration";

const Routers=()=>{
    return(
    <Switch>
        <Route path='/' component={Main} exact/>
        <Route path='/Main' component={Main} exact/>
        <Route path='/Personalroom' component={Personalroom} exact/>
        <Route path='/Transfer' component={Transfer} exact/>
        <Route path='/Registration' component={Regist} exact/>
    </Switch>);
};
export default Routers;