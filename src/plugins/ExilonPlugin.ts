export interface Plugin {
  name: string;
  setup: (app: ExilonApp) => void | Promise<void>;
}

export class ExilonApp {
  private plugins: Plugin[] = [];

  use(plugin: Plugin) {
    this.plugins.push(plugin);
    return this;
  }

  async initialize() {
    for (const plugin of this.plugins) {
      await plugin.setup(this);
    }
  }
}
