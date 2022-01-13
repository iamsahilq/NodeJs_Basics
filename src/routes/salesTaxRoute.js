import express from 'express';

import generateReceipt from '../assignments/salesTaxProblem';

const router = express.Router();

router.post('/', (req, res, next) => {
  try {
    const { basket = [] } = req.body;
    const data = generateReceipt(basket);
    res.send(data);
  } catch (error) {
    next(error);
  }
});

export default router;
