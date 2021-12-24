import React,{useEffect, useState} from 'react'
import { UseContext } from '../Contract/Context'
import { Link } from 'react-router-dom'



const Transfer=()=>
{
    const{web3,Contract}=UseContext()
    const address = sessionStorage.getItem('address')
    const [adrTo,setAdrTo]=useState('')
    const [category,setCategory]=useState()
    const[codeWotd,setCodeWord]=useState('')
    const[description,setDescription]=useState('')
    const[value,setValue]=useState()
    const[idTrans,setIdTrans]=useState()
    const[sayPass,setSayPass]=useState('')
    const[idTrans2,setIdTrans2]=useState()
    const[Accounts,setAccounts]=useState([])
    const[viewAdr,setviewAdr]=useState()

    
    const createTransfer=async(e)=>
{
        e.preventDefault()
    try{
            await Contract.methods.createTransfer(adrTo,category,codeWotd,description).send({from:address, value: value*(10**18)})
            const transId = await Contract.methods.getTransId().call()
            e.target.reset()
            alert(`ID транзакции: ${transId}`)
    }catch(e)
    {
        alert(e)
    }
  
 }

   
   const confirmTrans=async(e)=>
   {
       e.preventDefault()
           try{
               await Contract.methods.acceptTrans(idTrans,sayPass).send({from: address})
               e.target.reset(e)
               alert(`Перевод номер принят`)

           }catch{alert(e)}
       
   }

   const cancelTrans=async(e)=>{
       e.preventDefault()
       try{
           await Contract.methods.cancelTrans(idTrans2).send({from: address})
           e.target.reset(e)
           alert(`Вы отменили перевод`)

       }catch{alert(e)}
   }
   useEffect(()=>{
    const ListAccount=async()=>{
        let Users = await web3.eth.getAccounts()
        Users[0]="Cписок адрессов"
        setAccounts(Users)
    }
    ListAccount()

},)

    return(
        <>
        <h4>Список пользователей</h4>
        <select onChange={setviewAdr}>
                {Accounts.map((arr,i)=><option key={i} value={String(arr)}>{arr}</option>)}
            </select>
    
        <h4>Создание транзакции</h4>
        <form onSubmit={createTransfer}>
            <input type='text' placeholder='получатель' onChange={(e)=>setAdrTo(e.target.value)}></input><br/>
            <input type='text' placeholder='категория' onChange={(e)=>setCategory(e.target.value)}></input><br/>
            <input type='text' placeholder='секретное слово' onChange={(e)=>setCodeWord(e.target.value)}></input><br/>
            <input type='text' placeholder='сумма' onChange={(e)=>setValue(e.target.value)}></input><br/>
            <input type='text' placeholder='комментарий' onChange={(e)=>setDescription(e.target.value)}></input><br/>
            <button>Перевести</button>
        </form><br/>
        <h4>Принятие перевода</h4>
        <form onSubmit={confirmTrans}>
            <input type='text' placeholder='ID транзакции' onChange={(e)=>setIdTrans(e.target.value)}></input><br/>
            <input type='text' placeholder='секретное слово' onChange={(e)=>setSayPass(e.target.value)}></input><br/>
            <button>Принять</button>
        </form><br/>
        <h4>Отмена перевода</h4>
        <form onSubmit={cancelTrans}>
            <input type='text' placeholder='Id транзакции' onChange={(e)=>setIdTrans2(e.target.value)}></input><br/>
            <button>Отменить</button>
        </form>
        
        <Link to='/Personalroom'>Назад</Link>
        
        </>)




}
export default Transfer