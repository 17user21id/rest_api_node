import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import request from 'request-promise'
import date from 'date-and-time'




const DB = 'mongodb+srv://abc123:Password123@cluster0.mnonm.mongodb.net/mernstack?retryWrites=true&w=majority'

mongoose.connect(DB,{
}).then(() => {
    console.log('connected to database !')
}).catch((err) => console.log('connection failed!'));


const TransactionSchema  = new mongoose.Schema({
    id:String,
    account:Number,
    Date:String,
    transaction:String,
    withdraw:String,
    deposit:String,
    balance:String,
})

const Transaction = mongoose.model('transaction' , TransactionSchema)

// async function getDataFromAPI() {
//     var transaction_data = [];

//         var url = `https://s3-ap-southeast-1.amazonaws.com/he-public-data/bankAccountdde24ad.json`;

//         var response_body = await request(url);

//         var user_json = JSON.parse(response_body);
//         console.log(user_json)
        

//         user_json.map((item,index)=>{
//             const value = date.format((new Date(item['Date'])),
//                 'DD-MM-YYYY');
//             var transaction = {
//                 // id:uuid(),
//                 account : item['Account No'],
//                 Date : value,
//                 transaction : item['Transaction Details'],
//                 withdraw : item['Withdrawal AMT'],
//                 deposit:item['Deposit AMT'],
//                 balance:item['Balance AMT']
//             };
//             transaction_data.push(transaction);
//             transaction_values.push(transaction)
//         })

//     return transaction_data;
// }




export const getTransactions =async (req, res) => {
    
    // getDataFromAPI().then(function(resuts){
    //     res.send(transaction_values)
    // })

    try{
        const transaction = await Transaction.find();
        res.json(transaction)
    }catch(err){
        res.json({message:err})
    }

}

export const GetTransactionUsingDate = async (req, res) => {
    
    // getDataFromAPI().then(function(resuts){
    //     const arr = []
    // const user = transaction_values.map((item,index)=>{
    //     if(item.Date == req.params.date){
    //         arr.push(item)
    //     }
       
    // })
    // res.send(arr)
    // })
    try{
        const transaction =await Transaction.find({Date:req.params.date})
        res.send(transaction)
    }catch(err){
        res.json({message:'Error can Transaction on specific date '})
    }
    
};


export const GetBalanceUsingDate = async (req, res) => {
    
    // getDataFromAPI().then(function(resuts){
    //     const arr = []

    //     const user = transaction_values.map((item,index)=>{
    //         if(item.Date == req.params.date){
    //             arr.push(item.balance)
    //         }
    //     })
    //     res.send(arr[arr.length-1])
    // })

    try{
        const transaction = await Transaction.find({Date:req.params.date})
        const arr = []
        transaction.map((item,index) => {
            arr.push(item.balance)
        })
        res.send(`balance at the end of day = ${arr[arr.length-1]}`)

    }catch(err){
        res.json({message:'Error can find balance '})
    }
};

export const GetALLDataUsingID = async (req,res) => {
    // getDataFromAPI().then(function(resuts){
    //     const user = transaction_values.find((user) => user.id == req.params.id);
    //     res.send(user.transaction)
    // })
    try{
        const transaction = await Transaction.findById(req.params.id);
        res.json(transaction)
    }catch(err){
        res.json({message:'Error could not find transaction with specific id'})
    }

}


export const createTransaction = (req, res) => { 

    const {  Date , transaction , withdraw , deposit , balance} = req.body
    const account=409000611074

    if(!Date||!transaction||!balance ){
        return res.status(422).json({error:'Please Fill the data properly'})
    }


    const transactionData = new Transaction({account , Date , transaction , withdraw , deposit , balance})
    transactionData.save().then(() => {
        res.status(201).json({message:`post sucessful`})
    }).catch((err) => res.status(500).json({error:"Failed to Post Transaction"}))
    
};


