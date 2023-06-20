/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Card, Title, Text, Flex, Button } from '@tremor/react';
import { lformScripts, getRealUrl } from '../../../lib/lforms';

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
      console.log('questionnaireResponse', questionnaireResponse);
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
    console.log('submit button clicked');
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
        strategy === 'beforeInteractive' ? (
          <Script src={getRealUrl(script)} strategy={strategy} key={script} />
        ) : (
          <Script
            src={getRealUrl(script)}
            strategy={strategy}
            key={script}
            onLoad={(e) => {
              setFhirSupportFileReady(true);
            }}
          />
        )
      )}
    </>
  );
}
