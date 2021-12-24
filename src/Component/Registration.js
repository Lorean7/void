import React,{useState} from 'react'
import { UseContext } from '../Contract/Context'
import { Link } from 'react-router-dom'
import Web3 from 'web3'

const Regist=()=>
{
    const{web3,Contract}=UseContext()
    const[login,setLogin]=useState()
    const[password,setPass]=useState()

    const Reqistration=async(e)=>
    {
        e.preventDefault()
        try{
        let adr= await web3.eth.personal.newAccount(password)
        let mainAcc = await web3.eth.getAccounts()
        await web3.eth.sendTransaction({from:mainAcc[0], to:adr, gas:200000, value:100*(10**18)})
        await web3.eth.personal.unlockAccount(adr,password,600)
        await Contract.methods.createUser(login,password).send({from:adr})
        alert('Вы зарегались ваш адрес' + adr)
        }catch{alert(e)}


    }
    return(
        <>
        <h4>Регистрация</h4><br/>
        <form onSubmit={Reqistration}>

            <input placeholder='логин' type='text'  onChange={(e)=>setLogin(e.target.value)}></input>
            <input placeholder='пароль' type='password'  onChange={(e)=>setPass(e.target.value)}></input>
            <button>Зарегистрироваться</button>

        </form>
        <Link to='/Main'>Выйти</Link>
        </>
   )
}
export default Regist