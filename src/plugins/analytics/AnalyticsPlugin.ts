import { Plugin } from '../types';

export interface AnalyticsConfig {
  trackingId: string;
  enableDebug?: boolean;
}

export class AnalyticsPlugin implements Plugin {
  name = 'exilon-analytics';
  version = '1.0.0';

  constructor(private config: AnalyticsConfig) {}

  onInit() {
    console.log('🔍 Analytics inicializado:', this.config.trackingId);
  }

  onRouteChange(route: string) {
    console.log('📊 Página vista:', route);
  }
}
