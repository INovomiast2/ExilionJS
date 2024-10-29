interface CacheOptions {
  duration: number; // en segundos
  staleWhileRevalidate?: boolean;
}

export class ExilonCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();

  async get<T>(key: string, fetcher: () => Promise<T>, options: CacheOptions): Promise<T> {
    const cached = this.cache.get(key);
    const now = Date.now();

    if (cached && (now - cached.timestamp) / 1000 < options.duration) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, { data, timestamp: now });
    return data;
  }

  invalidate(key: string) {
    this.cache.delete(key);
  }
}
