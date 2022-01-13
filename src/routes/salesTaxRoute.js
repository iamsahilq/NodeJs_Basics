import express from 'express';

import generateReceipt from '../assignments/salesTaxProblem';

const router = express.Router();

router.post('/', (req, res, next) => {
  try {
    const { basket = [] } = req.body;
    if (!basket.length) {
      const response = {};
      response.message = 'Empty basket.';
      response.status = 400;
      return res.status(response.status).send(response);
    }
    const data = generateReceipt(basket);
    return res.send(data);
  } catch (error) {
    return next(error);
  }
});

export default router;
