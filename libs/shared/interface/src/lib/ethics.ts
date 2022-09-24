import { Route } from '@angular/router';
export type EthicsMode = 'accusation' | 'investigation' | 'inquiry' | 'publish';

export interface EthicsCustomRouteData {
  menuConfig: MenuConfig[];
  headerLabel: string;
  headerDetail?: string;
  ethicsMode?: EthicsMode;
}

export interface MenuConfig {
  icon?: string;
  label: string;
  path: string;
  params?: any;
  subMenu?: MenuConfig[];
  subMenuName?: string;
  isExpanded?: boolean;
  hasThirdLevelMenu?: boolean;
}

export interface EthicsCustomRoute extends Route {
  data?: EthicsCustomRouteData;
}
