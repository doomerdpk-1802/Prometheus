import { Request, Response, NextFunction } from "express";
import { requestCounter } from "./metrics/request.js";
import { activeRequestsGauge } from "./metrics/activeRequests.js";
import { httpReqDurationMs } from "./metrics/req_duration.js";

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const startTime = Date.now();
  activeRequestsGauge.inc();

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    requestCounter.inc({
      method: req.method,
      route: req.route?.path,
      status_code: res.statusCode,
    });

    httpReqDurationMs.observe(
      {
        method: req.method,
        route: req.route?.path,
        status_code: res.statusCode,
      },
      duration,
    );

    activeRequestsGauge.dec();
  });
  next();
}
