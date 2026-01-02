
import { Post, MarketItem } from './types';

declare global {
  interface Window {
    flutter_inappwebview?: {
      callHandler: (handler: string, ...args: any[]) => Promise<any>;
    };
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

/**
 * Sends a message to the native host (Flutter or React Native).
 */
export const postMessageToNative = (action: string, data: any = {}) => {
  const payload = JSON.stringify({ action, data, timestamp: Date.now() });
  
  // Flutter InAppWebView
  if (window.flutter_inappwebview) {
    window.flutter_inappwebview.callHandler('onNativeAction', payload);
  }
  
  // React Native WebView
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(payload);
  }

  console.log(`[NativeBridge] ${action}:`, data);
};

export const formatPrice = (price: number, lang: string) => {
  if (lang === 'KO') return `${price.toLocaleString()}원`;
  if (lang === 'TH') return `฿${(price / 40).toLocaleString()}`;
  return `$${(price / 1300).toFixed(2)}`;
};

export const timeAgo = (date: string) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};
