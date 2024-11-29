import { useEffect, useState, useRef } from "react";

type Subscriber = () => void;

interface ResponsiveConfig {
  [key: string]: number;
}
interface ResponsiveInfo {
  [key: string]: boolean;
}

const defaultConfig: ResponsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

export const useSsrSafeResponsive = (
  responsiveConfig: ResponsiveConfig = defaultConfig
) => {
  const infoRef = useRef<ResponsiveInfo>({});
  const [state, setState] = useState<ResponsiveInfo>({});
  const [isWindow, setIsWindow] = useState(false)

  const isVanillaListenerRefExist = useRef(false);

  const subscribersRef = useRef(new Set<Subscriber>());

  if (typeof window == 'undefined') return

  const calculate = () => {
    if (!window) return;
    const width = window.innerWidth;
    const newInfo = {} as ResponsiveInfo;
    let shouldUpdate = false;
    for (const key of Object.keys(responsiveConfig)) {
      newInfo[key] = width >= responsiveConfig[key];
      if (newInfo[key] !== infoRef.current[key]) {
        shouldUpdate = true;
      }
    }

    if (shouldUpdate) {
      infoRef.current = newInfo;
    }
  };

  const eventListenerFn = useRef(() => {
    const oldInfo = infoRef.current;

    calculate();

    if (oldInfo === infoRef.current) return;

    for (const subscriber of subscribersRef.current) {
      subscriber();
    }
  });

  const addResizeListener = () => {
    if (
      typeof window == 'undefined' ||
      isVanillaListenerRefExist.current ||
      subscribersRef.current.size
    )
      return;

    isVanillaListenerRefExist.current = true;

    // @ts-ignore
    window?.addEventListener("resize", eventListenerFn.current);
  };

  addResizeListener();

  useEffect(() => {
    const subscriber = () => {
      setState(infoRef.current);
    };
    subscribersRef.current.add(subscriber);
    return () => {
      subscribersRef.current.delete(subscriber);
      if (window) {
        window.removeEventListener("resize", eventListenerFn.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!!window) {
      setIsWindow(true)
    }
  }, [window!])

  useEffect(() => {
    if (isWindow) {

      eventListenerFn.current();
    }
  }, [isWindow]);

  return state;
};
