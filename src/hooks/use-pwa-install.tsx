import { useEffect, useState } from "react";

let deferredPrompt: { prompt: () => void } | null = null;

const usePWAInstall = () => {
  const [isInstalled, setIsInstalled] = useState(false);

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

  const installApp = () => deferredPrompt?.prompt();

  return { installApp, isInstalled };
};

export default usePWAInstall;
