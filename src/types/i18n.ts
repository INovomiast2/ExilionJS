export interface Translations {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: {
      primary: string;
      docs: string;
      github: string;
    }
  };
  features: {
    title: string;
    subtitle: string;
    list: {
      routing: {
        title: string;
        description: string;
      };
      performance: {
        title: string;
        description: string;
      };
      components: {
        title: string;
        description: string;
      };
      themes: {
        title: string;
        description: string;
      };
      typescript: {
        title: string;
        description: string;
      };
      security: {
        title: string;
        description: string;
      };
    };
  };
  code: {
    title: string;
    subtitle: string;
    copy: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    list: Array<{
      name: string;
      role: string;
      company: string;
      content: string;
    }>;
  };
  nav: {
    features: string;
    code: string;
    testimonials: string;
    docs: string;
  };
} 