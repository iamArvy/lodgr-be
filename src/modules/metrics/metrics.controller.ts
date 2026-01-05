import { Controller, Get, Header } from '@nestjs/common';
import { SkipWrap } from 'src/common/decorators/skip-wrap.decorator';

import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private metrics: MetricsService) {}

  @SkipWrap()
  @Get()
  @Header('Content-Type', 'text/plain')
  getMetrics() {
    return this.metrics.getMetrics();
  }
}
