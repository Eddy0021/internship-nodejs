import { Request, Response, NextFunction } from 'express';

import { sendApiResponse } from '../helpers/response'

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  sendApiResponse(res, 500, null, 'Internal server error');
};

export default errorMiddleware;
