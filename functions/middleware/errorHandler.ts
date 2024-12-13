import { NextFunction, Request, Response } from "express";

const errorHandle = (err:any, _:Request, res:Response, __:NextFunction) => {
  const status = err.status || 500; // Fallback qiymat
  const message = err.message || "Internal Server Error"; // Fallback qiymat

  res.status(status).json({
    message,
    status,
  });
};


export default errorHandle;
