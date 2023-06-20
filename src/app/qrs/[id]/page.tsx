import { Card } from '@tremor/react';
import LForm from './LForm';

export default async function Questionnaire({
  params: { id }
}: {
  params: { id: string };
}) {
  const questionnaireResponse = await fetch(
    `${process.env.FHIR_SERVER_BASE_URL}/QuestionnaireResponse/${id}/get`
  ).then((response) => response.json());

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="mt-6">
        <LForm questionnaireResponse={questionnaireResponse} />
      </Card>
    </main>
  );
}
