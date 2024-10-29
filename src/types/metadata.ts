export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export interface MetadataGenerator {
  metadata: PageMetadata | (() => PageMetadata | Promise<PageMetadata>);
}
