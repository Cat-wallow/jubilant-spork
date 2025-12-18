import type { ReactElement } from "react";

export interface IRoute {
  name: string;
  layout: string;
  icon: ReactElement | string;
  items?: any;
  path: string;
  secondary?: boolean | undefined;
  collapse?: boolean | undefined;
  collapsible?: boolean | undefined;
  permission?: string | string[] | undefined;
}
export type RoutesType = IRoute;
