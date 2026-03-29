import { Request, Response, NextFunction } from "express";
import { requestCounter } from "./metrics/request.js";
import { activeRequestsGauge } from "./metrics/activeRequests.js";

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  activeRequestsGauge.inc();

  res.on("finish", () => {
    requestCounter.inc({
      method: req.method,
      route: req.route?.path,
      status_code: res.statusCode,
    });

    activeRequestsGauge.dec();
  });
  next();
}
