/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Flex, Button } from '@tremor/react';
import { lformScripts, getRealUrl } from '../../../lib/lforms';
import Script from 'next/script';

export default function LForm({
  questionnaireResponse,
  id
}: {
  questionnaireResponse: any;
  id: string;
}) {
  const formContainer = useRef<HTMLDivElement>(null);
  const formRendered = useRef(false);
  const [fhirSupportFileReady, setFhirSupportFileReady] = useState(false);

  useEffect(() => {
    if (
      formContainer.current &&
      window.LForms &&
      questionnaireResponse &&
      fhirSupportFileReady &&
      !formRendered.current
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
      formRendered.current = true;
    }
  }, [formContainer, questionnaireResponse, fhirSupportFileReady]);

  const handleSubmit = async ({ id }: { id: string }) => {
    if (formContainer.current && fhirSupportFileReady) {
      try {
        const resource = window.LForms.Util.getFormFHIRData(
          'QuestionnaireResponse',
          'R4',
          formContainer.current
        );
        const questionnaireResponse = await fetch(
          `${process.env.NEXT_PUBLIC_FHIR_SERVER_BASE_URL}/QuestionnaireResponse/${id}/put`,
          {
            method: 'PUT',
            body: JSON.stringify({ resource }),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
          }
        ).then((response) => response.json());
        window.alert(
          'Your response has been submitted. Thank you for your participation!'
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div id="form-container" ref={formContainer}></div>
      <Flex justifyContent="end" className="space-x-2 border-t pt-4 mt-4">
        <Button
          size="xs"
          variant="primary"
          onClick={() => handleSubmit({ id })}
        >
          Submit
        </Button>
      </Flex>
      {lformScripts.map(([script, strategy]) =>
        strategy === 'beforeInteractive' ? null : (
          <Script
            src={getRealUrl(script)}
            key={script}
            onLoad={() => setFhirSupportFileReady(true)}
          />
        )
      )}
    </>
  );
}
