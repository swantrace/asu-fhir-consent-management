import { Button, Card } from '@tremor/react';
import QuestionnaireResponsesTable from './table';
import { getServerSession } from 'next-auth';
import NotLogin from './notLogin';

export default async function IndexPage() {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Card className="mt-6">
          <NotLogin callbackUrl="/" />
        </Card>
      </main>
    );
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_FHIR_SERVER_BASE_URL}/Patient?identifier=${email}`
  );
  const patient = await res.json();
  const questionnaireResponses =
    patient?.questionnaireResponses ??
    (await fetch(
      `${process.env.NEXT_PUBLIC_FHIR_SERVER_BASE_URL}/QuestionnaireResponse`
    ).then((res) => res.json()));
  const completeQuestionnaireResponsesFetchPromises =
    questionnaireResponses?.map(async (questionnaireResponse: any) => {
      const questionnaireId =
        questionnaireResponse.resource.questionnaire.split('Questionnaire/')[1];
      const questionnaireRes = await fetch(
        `${process.env.NEXT_PUBLIC_FHIR_SERVER_BASE_URL}/Questionnaire/${questionnaireId}`,
        { cache: 'force-cache' }
      );
      const questionnaire = await questionnaireRes.json();
      return { ...questionnaireResponse, questionnaire };
    });
  const completeQuestionnaireResponses = await Promise.all(
    completeQuestionnaireResponsesFetchPromises
  );

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="mt-6">
        {/* @ts-expect-error Server Component */}
        <QuestionnaireResponsesTable
          questionnaireResponses={completeQuestionnaireResponses}
        />
      </Card>
    </main>
  );
}
