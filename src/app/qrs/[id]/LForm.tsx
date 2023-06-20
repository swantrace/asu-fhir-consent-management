/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { lformScripts, getRealUrl } from '../../../lib/lforms';

const scripts = lformScripts.slice(-1);

export default function LForm({
  questionnaireResponse
}: {
  questionnaireResponse: any;
}) {
  const formContainer = useRef<HTMLDivElement>(null);
  const [fhirSupportFileReady, setFhirSupportFileReady] = useState(false);

  useEffect(() => {
    if (
      formContainer.current &&
      window &&
      window.LForms &&
      questionnaireResponse &&
      fhirSupportFileReady
    ) {
      const {
        questionnaire: { resource: questionnaireResource },
        resource: questionnaireResponseResource
      } = questionnaireResponse;
      const formData = window.LForms.Util.convertFHIRQuestionnaireToLForms(
        questionnaireResource,
        'R4'
      );
      const formDefinition = window.LForms.Util.mergeFHIRDataIntoLForms(
        'QuestionnaireResponse',
        questionnaireResponseResource,
        formData,
        'R4'
      );
      window.LForms.Util.addFormToPage(
        formDefinition ?? {},
        formContainer.current ?? {},
        {
          prepopulate: true
        }
      );
    }
  }, [formContainer, questionnaireResponse, fhirSupportFileReady]);
  return (
    <>
      <div id="form-container" ref={formContainer}></div>
      {scripts.map((script) => (
        <Script
          src={getRealUrl(script)}
          strategy="lazyOnload"
          key={script}
          onLoad={(e) => {
            setFhirSupportFileReady(true);
          }}
        />
      ))}
    </>
  );
}
