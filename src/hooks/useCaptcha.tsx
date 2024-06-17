import { useEffect, useState } from "react";

export type CaptchaHook = {
  getResponse: () => string | undefined;
  render: () => void;
  element: JSX.Element;
  rendered: boolean;
};

export function useCaptcha(siteKey: string): CaptchaHook {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(false);
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js?hl=en";
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const renderCaptchaFrame = () => {
    try {
      grecaptcha.render("recaptcha", {
        sitekey: siteKey,
        theme: "dark",
      });
      setRendered(true);
    } catch (e) {
      setRendered(false);
    }
  };

  const getCaptchaResponse = () => {
    try {
      return grecaptcha.getResponse();
    } catch (e) {
      return undefined;
    }
  };

  return {
    element: <div id="recaptcha" />,
    rendered: rendered,
    getResponse: getCaptchaResponse,
    render: renderCaptchaFrame,
  };
}
