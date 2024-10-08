import * as React from "react";
import type { RequestHandler } from "msw";
import { setupWorker } from "msw/browser";

const Msw = ({
  children,
  msw,
}: {
  children: React.ReactElement;
  msw: RequestHandler[];
}) => {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const initMsw = async () => {
      if (msw.length > 0) {
        if (!window.__ladle_msw) {
          window.__ladle_msw = setupWorker();
          window.__ladle_msw.use(...msw);
          window.__ladle_msw
            .start({
              serviceWorker: {
                url: `${(global as any).env.BASE_URL}mockServiceWorker.js`,
              },
            })
            .then(() => {
              setReady(true);
            });
        } else {
          window.__ladle_msw.use(...msw);
          setReady(true);
        }
      }
    };
    initMsw();
    return () => {
      if (window.__ladle_msw) {
        window.__ladle_msw.resetHandlers();
      }
    };
  }, [msw]);
  if (msw.length === 0) return children;
  if (!ready) return null;
  return children;
};

export default Msw;
