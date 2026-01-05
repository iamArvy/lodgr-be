import { Injectable, OnModuleInit } from '@nestjs/common';
import { collectDefaultMetrics, Registry } from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  registry = new Registry();

  onModuleInit() {
    collectDefaultMetrics({ register: this.registry });
  }

  getMetrics() {
    return this.registry.metrics();
  }
}
