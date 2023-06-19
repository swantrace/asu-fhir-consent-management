import { Card } from '@tremor/react';
import QuestionnaireResponsesTable from './table';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const session = await getServerSession();
  const email = session?.user?.email;
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/mock/fhir/Patient?identifier=${email}`
  );
  const patient = await res.json();
  const questionnaireResponses = patient?.questionnaireResponses ?? [];
  const completeQuestionnaireResponsesFetchPromises =
    questionnaireResponses?.map(async (questionnaireResponse: any) => {
      const questionnaireId =
        questionnaireResponse.resource.questionnaire.split('Questionnaire/')[1];
      const questionnaireRes = await fetch(
        `${process.env.NEXTAUTH_URL}/api/mock/fhir/Questionnaire/${questionnaireId}`
      );
      const questionnaire = await questionnaireRes.json();
      return { ...questionnaireResponse, questionnaire };
    });
  const completeQuestionnaireResponses = await Promise.all(
    completeQuestionnaireResponsesFetchPromises
  );

  const users = [
    { id: 1, name: 'test', username: 'test', email: 'test@test.com' },
    { id: 2, name: 'test2', username: 'test2', email: 'test2@test.com' }
  ];

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
