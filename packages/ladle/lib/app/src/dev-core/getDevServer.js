const getDevServer = () => {
  return {
    // The bundle is always loaded from a server in the browser.
    bundleLoadedFromServer: true,

    /** URL but ensures that platform query param is added. */
    get fullBundleUrl() {
      if (document?.currentScript && "src" in document.currentScript) {
        return document.currentScript.src;
      }

      const bundleUrl = new URL(location.href);

      bundleUrl.searchParams.set("platform", "web");

      return bundleUrl.toString();
    },
    url: location.origin + location.pathname,
  };
};

export default getDevServer;
