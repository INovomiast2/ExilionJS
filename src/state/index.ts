import { Logger } from '../utils/Logger';

interface StateData {
  [key: string]: any;
}

type Listener = () => void;

class State {
  private state: StateData;
  private listeners: Listener[];

  constructor() {
    this.state = {};
    this.listeners = [];
  }

  setState(newState: Partial<StateData>): void {
    this.state = { ...this.state, ...newState };
    Logger.info(`Estado actualizado: ${JSON.stringify(newState)}`);
    this.notifyListeners();
  }

  getState(): StateData {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // Métodos adicionales que podrían ser útiles
  
  resetState(): void {
    this.state = {};
    Logger.info('Estado reiniciado');
    this.notifyListeners();
  }

  removeKey(key: string): void {
    if (key in this.state) {
      const { [key]: _, ...rest } = this.state;
      this.state = rest;
      Logger.info(`Clave eliminada del estado: ${key}`);
      this.notifyListeners();
    }
  }
}

export default new State();
