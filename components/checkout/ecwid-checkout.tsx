'use client';

import { useEffect } from 'react';

interface EcwidCheckoutProps {
  storeId: string;
  cartId?: string;
}

export default function EcwidCheckout({ storeId, cartId }: EcwidCheckoutProps) {
  useEffect(() => {
    let ecwidLoaded = false;

    function load_ecwid() {
      if (typeof window.Ecwid !== 'undefined') {
        window.Ecwid.OnAPILoaded.add(function () {
          if (!ecwidLoaded) {
            ecwidLoaded = true;
            window.xProductBrowser('id=ecStoreProductBrowser');
            window.Ecwid.openPage('cart');
          }
        });

        window.Ecwid.OnPageLoad.add(function (page) {
          if (!page.hasPrevious) {
            window.Ecwid.openPage('cart');
          }
        });

        window.Ecwid.OnPageSwitch.add(function (page) {
          const is_cart_page = page.type === 'CART';
          const is_download_error_page = page.type === 'DOWNLOAD_ERROR';
          const is_checkout_page = page.type.indexOf('CHECKOUT_') >= 0;
          const is_order_page = page.type.indexOf('ORDER_') >= 0;

          if (page.type === 'ORDER_CONFIRMATION' && page.orderId) {
            document.cookie = 'cartId=';
          }

          if (page.type === 'CATEGORY') {
            location.href = '/';
            return true;
          }

          if (!is_cart_page && !is_download_error_page && !is_checkout_page && !is_order_page) {
            window.Ecwid.openPage('cart');
            return true;
          }
        });
      }
    }

    // Initialize Ecwid configuration
    window.ec = {
      config: {
        storefrontUrls: {
          cleanUrls: true,
          queryBasedCleanUrls: true
        }
      },
      storefront: {
        show_breadcrumbs: false,
        show_footer_menu: false
      }
    };

    window.ecwid_script_defer = true;
    window.ecwid_dynamic_widgets = true;

    // Set cart data in localStorage
    if (cartId) {
      const checkout = {
        id: cartId,
        itemsCount: 0
      };
      localStorage.setItem(`ec-${storeId}-checkout`, JSON.stringify(checkout));
    }

    // Load Ecwid script
    if (!document.getElementById('ecwid-script')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://app.ecwid.com/script.js?${storeId}&data_platform=nextjs_commerce&storefront-v3=true`;
      script.id = 'ecwid-script';
      script.onload = load_ecwid;
      document.body.appendChild(script);
    } else {
      load_ecwid();
    }

    // Cleanup function
    return () => {
      const script = document.getElementById('ecwid-script');
      if (script) {
        script.remove();
      }
    };
  }, [storeId, cartId]);

  return <div id="ecStoreProductBrowser">Loading checkout...</div>;
}
