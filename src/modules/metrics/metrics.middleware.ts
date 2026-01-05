import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Histogram } from 'prom-client';

export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency',
  labelNames: ['method', 'path', 'status'],
});

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const end = httpRequestDuration.startTimer();
    res.on('finish', () => {
      end({ method: req.method, path: req.url, status: res.statusCode });
    });
    next();
  }
}
