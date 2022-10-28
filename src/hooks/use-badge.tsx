import { useState } from 'react';

const useAppBadge = () => {
  const [counter, setCounter] = useState(1);

  const setBadge = () => {
    setCounter(counter + 1);
    // @ts-ignore
    if (navigator.setAppBadge) {
      // @ts-ignore
      navigator.setAppBadge(counter);
    } 
    // @ts-ignore
    else if (navigator.setClientBadge) {
      // @ts-ignore
      navigator.setClientBadge();
    }
  };

  const clearBadge = () => {
    setCounter(1);
    // @ts-ignore
    if (navigator.clearAppBadge) {
      // @ts-ignore
      navigator.clearAppBadge();
      // @ts-ignore
    } else if (navigator.clearClientBadge) {
      // @ts-ignore
      navigator.clearClientBadge();
    }
  };

  return [setBadge, clearBadge];
};

export default useAppBadge;