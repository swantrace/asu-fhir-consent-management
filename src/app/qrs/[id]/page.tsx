import { Card } from '@tremor/react';
import { getServerSession } from 'next-auth';
import LForm from './LForm';
import NotLogin from '../../notLogin';

export default async function Questionnaire({
  params: { id }
}: {
  params: { id: string };
}) {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Card className="mt-6">
          <NotLogin callbackUrl={`/qrs/${id}`} />
        </Card>
      </main>
    );
  }
  const questionnaireResponse = await fetch(
    `${process.env.NEXT_PUBLIC_FHIR_SERVER_BASE_URL}/QuestionnaireResponse/${id}/get`
  ).then((response) => response.json());

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="mt-6">
        <LForm questionnaireResponse={questionnaireResponse} id={id} />
      </Card>
    </main>
  );
}
