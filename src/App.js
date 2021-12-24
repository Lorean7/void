import React,{useState} from 'react'
import Web3 from 'web3'
import {BrowserRouter as Router} from 'react-router-dom'
import { Context } from './Contract/Context'
import { UserList } from './Contract/UserList'
import Routers from './router'

const App=()=>
{
  const[web3]=useState(new Web3('http://127.0.0.1:8545'))
  const addressContract = '0x8eD4CFd3b9Da0013999897aF4cb7E975Ee0a14f9'
  const[Contract]=useState(new web3.eth.Contract(UserList,addressContract))

  return(
    <Router>
        <Context.Provider value={{web3,Contract}}>
            <Routers/>
        </Context.Provider>

    </Router>


  );
}
export default App