type Listener = () => void;
type Selector<T> = (state: any) => T;

export class ExilonStore {
  private state: Record<string, any> = {};
  private listeners: Set<Listener> = new Set();

  setState<T>(key: string, value: T) {
    this.state[key] = value;
    this.notify();
  }

  getState<T>(selector: Selector<T>): T {
    return selector(this.state);
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }
}

export const store = new ExilonStore();
