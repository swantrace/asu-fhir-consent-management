import { NextResponse } from 'next/server';
import questionnaireResponses from '../../../../../../../lib/mock/QuestionnaireResponse';
import questionnaires from '../../../../../../../lib/mock/Questionnaire';

export const revalidate = 60 * 60 * 24; // 24 hours
export const runtime = 'edge';

export function GET(
  _: Request,
  { params: { id } }: { params: { id: string } }
) {
  const questionnaireResponse = questionnaireResponses.find(
    (qr) => qr.resource.id === id
  );
  const questionnaire = questionnaires?.find(
    (q) =>
      `Questionnaire/${q.resource.id}` ===
      questionnaireResponse?.resource.questionnaire
  );
  return questionnaireResponse && questionnaire
    ? NextResponse.json(
        { ...questionnaireResponse, questionnaire },
        { status: 200 }
      )
    : NextResponse.json({ error: 'not found' }, { status: 404 });
}
