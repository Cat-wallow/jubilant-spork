export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface RoutesType {
    name: string;
    layout: string;
    icon: import("react").ReactElement | string;
    path: string;
    secondary?: boolean | undefined;
    collapsible?: boolean | undefined;
    permission?: string | string[] | undefined;
  }
}
