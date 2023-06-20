import { NextResponse } from 'next/server';
import questionnaires from '../../../../../../../lib/mock/Questionnaire';
import { kv } from '@vercel/kv';

export const revalidate = 60 * 60 * 24; // 24 hours
export const runtime = 'edge';

export async function GET(
  _: Request,
  { params: { id } }: { params: { id: string } }
) {
  const questionnaireResponses = (await kv.get('qrs')) as any[];

  const questionnaireResponse = questionnaireResponses.find(
    (qr: any) => qr.resource.id === id
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
