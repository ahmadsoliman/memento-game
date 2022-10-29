import { useEffect, useState } from "react";

let deferredPrompt: { prompt: () => void } | null = null;

const getPWADisplayMode = () => {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  if (document.referrer.startsWith("android-app://")) {
    return "twa";
  }
  // @ts-ignore
  else if (navigator.standalone || isStandalone) {
    return "standalone";
  }
  return "browser";
};

const usePWAInstall = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const eventListener = (e: unknown) => {
      deferredPrompt = e as { prompt: () => void };
    };
    window.addEventListener("beforeinstallprompt", eventListener);
    return () => {
      window.removeEventListener("beforeinstallprompt", eventListener);
    };
  }, []);

  useEffect(() => {
    const eventListener = () => {
      setIsInstalled(true);
      // Clear the deferredPrompt so it can be garbage collected
      deferredPrompt = null;
    };
    window.addEventListener("appinstalled", eventListener);
    return () => {
      window.removeEventListener("appinstalled", eventListener);
    };
  }, []);

  const installApp = () => {
    deferredPrompt?.prompt();
  };

  useEffect(() => {
    const mode = getPWADisplayMode();
    setIsPWA(mode === "standalone" || mode === "twa");
  }, []);

  return { installApp, isInstalled, isPWA };
};

export default usePWAInstall;
