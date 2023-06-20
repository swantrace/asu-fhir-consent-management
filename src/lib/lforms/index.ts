export const lformCdnBase =
  'https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/';

export const lformScripts = [
  ['webcomponent/assets/lib/zone.min.js', 'beforeInteractive'],
  ['webcomponent/scripts.js', 'beforeInteractive'],
  ['webcomponent/runtime-es5.js', 'beforeInteractive'],
  ['webcomponent/polyfills-es5.js', 'beforeInteractive'],
  ['webcomponent/main-es5.js', 'beforeInteractive'],
  ['fhir/lformsFHIRAll.min.js', 'lazyOnload']
] as const;

export const getRealUrl = (url: string) => {
  if (process.env.NEXT_PUBLIC_USE_LFORMS_CDN) {
    return `${lformCdnBase}${url}`;
  } else {
    return `/scripts/lforms/${url.replaceAll('/', '_')}`;
  }
};
