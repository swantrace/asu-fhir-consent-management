export const lformCdnBase =
  'https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/';

export const lformScripts = [
  'webcomponent/assets/lib/zone.min.js',
  'webcomponent/scripts.js',
  'webcomponent/runtime-es5.js',
  'webcomponent/polyfills-es5.js',
  'webcomponent/main-es5.js',
  'fhir/lformsFHIRAll.min.js'
];

export const getRealUrl = (url: string) => {
  if (process.env.NEXT_PUBLIC_USE_LFORMS_CDN) {
    return `${lformCdnBase}${url}`;
  } else {
    return `/scripts/lforms/${url.replaceAll('/', '_')}`;
  }
};
