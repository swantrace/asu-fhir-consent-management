import { mount, StartClient } from "solid-start/entry-client";

// import LFORMS component
const lformCdnBase =
  "https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/";

const scripts = [
  "webcomponent/assets/lib/zone.min.js",
  "webcomponent/scripts.js",
  "webcomponent/runtime-es5.js",
  "webcomponent/polyfills-es5.js",
  "webcomponent/main-es5.js",
];

const getRealUrl = (url: string) => {
  if (import.meta.env.VITE_LFORMS_CDN) {
    return `/scripts/lforms/${url.replaceAll("/", "_")}`;
  } else {
    return `${lformCdnBase}${url}`;
  }
};

scripts.forEach((src, index) => {
  const script = document.createElement("script");
  script.src = getRealUrl(src);
  if (index === scripts.length - 1) {
    script.onload = () => {
      const fhirScript = document.createElement("script");
      fhirScript.src = getRealUrl("fhir/lformsFHIRAll.min.js");
      fhirScript.defer = true;
      document.head.appendChild(fhirScript);
    };
  }
  document.head.appendChild(script);
});

mount(() => <StartClient />, document);
