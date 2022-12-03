import type {Request, Response} from 'express';
import ReviewCollection from './collection';
import * as userValidator from '../user/middleware';
import express from 'express';

const router = express.Router();

router.post('/', [userValidator.isUserLoggedIn], async(req: Request, res: Response) => {
    const {services, model, shop, rating} = req.body;
    const {userId: author} = req.session;

    const newReview = await ReviewCollection.addOne(services, model, shop, rating, author);

    res.status(200).json(newReview);
})

export {router as reviewRouter};