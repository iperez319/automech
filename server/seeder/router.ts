import type {Request, Response} from 'express';
import express from 'express';
import UserCollection from '../user/collection';
import { faker } from '@faker-js/faker';

const router = express.Router();

// const generateFakeUsers = async (n: number) => {
//     let users = []
//     for(let i = 0; i < n; i++){
        
//     }
// }

router.get('/', async(req: Request, res: Response) => {

})

export {router as seederRouter};