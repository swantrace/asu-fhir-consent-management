/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client';
import { useEffect, useRef } from 'react';
import Script from 'next/script';

const lformCdnBase =
  'https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/';

const scripts = [
  'webcomponent/assets/lib/zone.min.js',
  'webcomponent/scripts.js',
  'webcomponent/runtime-es5.js',
  'webcomponent/polyfills-es5.js',
  'webcomponent/main-es5.js',
  'fhir/lformsFHIRAll.min.js'
];

const getRealUrl = (url: string) => {
  if (process.env.NEXT_PUBLIC_USE_LFORMS_CDN) {
    return `${lformCdnBase}${url}`;
  } else {
    return `/scripts/lforms/${url.replaceAll('/', '_')}`;
  }
};

export default function LForm(formDefinition: any) {
  const formContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (formContainer.current) {
      window.LForms.Util.addFormToPage(
        formDefinition ?? {},
        formContainer.current ?? {},
        {
          prepopulate: true
        }
      );
    }
  }, [formContainer, formDefinition]);
  return (
    <>
      <div id="form-container" ref={formContainer}></div>
      {scripts.map((script) => (
        <Script
          src={getRealUrl(script)}
          strategy="beforeInteractive"
          key={script}
        />
      ))}
    </>
  );
}
