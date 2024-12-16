/* eslint-disable no-unused-vars */
interface EcwidPage {
  type: string;
  hasPrevious: boolean;
  orderId?: string;
}

interface EcwidConfig {
  storefrontUrls?: {
    cleanUrls?: boolean;
    queryBasedCleanUrls?: boolean;
  };
}

interface EcwidStorefront {
  show_breadcrumbs?: boolean;
  show_footer_menu?: boolean;
}

interface EcwidGlobal {
  OnAPILoaded: {
    add(callback: () => void): void;
  };
  OnPageLoad: {
    add(callback: (page: EcwidPage) => void): void;
  };
  OnPageSwitch: {
    add(callback: (page: EcwidPage) => boolean | void): void;
  };
  openPage(pageName: string): void;
}

interface Window {
  Ecwid: EcwidGlobal;
  xProductBrowser: (...args: string[]) => void;
  ec: {
    config: EcwidConfig;
    storefront: EcwidStorefront;
  };
  ecwid_script_defer: boolean;
  ecwid_dynamic_widgets: boolean;
}
