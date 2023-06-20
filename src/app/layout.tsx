/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import './globals.css';
import { Suspense } from 'react';
import Script from 'next/script';
import Nav from './nav';
import { lformScripts, getRealUrl } from '../lib/lforms';

const scripts = lformScripts.slice(0, -1);

export const metadata = {
  title: 'ASU Fhir Consent Management System',
  description: ''
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Suspense fallback="...">
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        {children}
        {scripts.map((script) => (
          <Script
            src={getRealUrl(script)}
            strategy="beforeInteractive"
            key={script}
          />
        ))}
        <link
          rel="stylesheet"
          href="https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/webcomponent/styles.css"
        />
      </body>
    </html>
  );
}
