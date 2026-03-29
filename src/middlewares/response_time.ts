import { Request, Response, NextFunction } from "express";

export async function responseTime(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const startTime = Date.now();
  await next();
  const endTime = Date.now();
  console.log(`Request took ${endTime - startTime}ms`);
}
