import React, {useState,useEffect} from 'react'
import { UseContext } from '../Contract/Context'
import { Link } from 'react-router-dom'


const Main=()=>
{
    const{web3,Contract}=UseContext()
    const[Accounts,setAccounts]=useState([])
    const[address,setAddress]=useState('')
    const[password,setPassword]=useState('')
    //------------------------------------
    const currentAddress=async(e)=>
    {
        setAddress(e.target.value)
    }

    const currentPassword=async(e)=>
    {
        setPassword(e.target.value)
    }


    useEffect(()=>{
        const ListAccount=async()=>{
            let Users = await web3.eth.getAccounts()
            Users[0]="Введите адрес"
            setAccounts(Users)
        }
        ListAccount()

    },)

        const Autorization=async(e)=>
        {
            e.preventDefault()
            try{
            await web3.eth.personal.unlockAccount(address,password,0)
            web3.eth.defaultAccount = address
            sessionStorage.setItem("address",address)
            alert("Вы авторизировались")
            }catch(e)
            {alert(e)}
        }

        return(
            <>
            <h3>Авторизация</h3><br/>
            <form onSubmit={Autorization}>
            <select onChange={currentAddress}>
                {Accounts.map((arr,i)=><option key={i} value={String(arr)}>{arr}</option>)}
            </select>
            <input onChange={currentPassword} placeholder='введите пароль' type='password'></input>
            <button>Авторизация</button><br/>
            </form>  
            <p> <Link to='Registration'>Регистрация</Link></p>
            <Link to="/Personalroom">Войти в личный кабинет</Link>
         
            

            
            </>


        )



}
export default Main