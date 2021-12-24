import React,{useState,useEffect}  from "react";
import { Link } from "react-router-dom";
import {UseContext } from "../Contract/Context";


const Personalroom=()=>
{
    const{web3,Contract}=UseContext()
    const address = sessionStorage.getItem('address')
    const[balance,setBalance]=useState()


    useEffect(
        ()=>{

            const getBalance=async()=>
            {
                const balance =await Contract.methods.getBalanceUser(address).call() /10**18
                setBalance(balance)
            }
            getBalance()
        },)

        async function logOut() {
            web3.eth.personal.lockAccount(address);
            alert("Вы вышли из аккаунта");
            
        }

return(
<>
<h4>Личный кабинет</h4>
<p>Адрес: {address}</p>
<p>Баланс: {balance}</p>
<Link   to='/Transfer'>Переводы</Link><br/>
<Link onClick={logOut}  to='/Main'>Выйти</Link>
</>

)
}
export default Personalroom
