import express from 'express';
import bodyParser from "body-parser";
import { getTransactions, createTransaction,GetTransactionUsingDate,GetBalanceUsingDate,GetALLDataUsingID } from '../controllers/users.js';

const router = express.Router();

router.get('/', getTransactions);

router.post('/add', bodyParser.urlencoded({ extended: false }),createTransaction);

router.get('/transactions/:date', GetTransactionUsingDate);

router.get('/balance/:date', GetBalanceUsingDate);

router.get('/details/:id', GetALLDataUsingID);

export default router;