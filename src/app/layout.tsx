/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import './globals.css';
import { Suspense } from 'react';
import Nav from './nav';

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
        <link
          rel="stylesheet"
          href="https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.6/webcomponent/styles.css"
        />
      </body>
    </html>
  );
}
