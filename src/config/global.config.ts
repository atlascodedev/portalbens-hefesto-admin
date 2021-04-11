import { AdonisConfig, adonisConfig } from "./adonis.config";
import { BrandingConfig, brandingConfig } from "./branding.config";
import { collections, DataCreationItem } from "./collections.config";

export interface AppConfig {
  branding: BrandingConfig;
  collections: Array<Partial<DataCreationItem>>;
}

export const globalConfig: AppConfig = {
  branding: brandingConfig,
  collections: collections,
};

export default globalConfig;
