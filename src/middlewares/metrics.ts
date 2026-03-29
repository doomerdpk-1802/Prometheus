import { Request, Response, NextFunction } from "express";
import { requestCounter } from "./metrics/request.js";

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.on("finish", () => {
    requestCounter.inc({
      method: req.method,
      route: req.route?.path,
      status_code: res.statusCode,
    });
  });
  next();
}
