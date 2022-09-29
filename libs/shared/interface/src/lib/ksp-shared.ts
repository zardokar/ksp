export interface MenuConfig {
  icon?: string;
  label: string;
  path: string;
  params?: KspParam;
  subMenu?: MenuConfig[];
  subMenuName?: string;
  isExpanded?: boolean;
}

export interface KspParam {
  type?: number;
  subtype?: number;
}
