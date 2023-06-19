import { NextResponse } from 'next/server';
import questionnaires from '../../../../../../lib/mock/Questionnaire';

export function GET(
  _: Request,
  { params: { id } }: { params: { id: string } }
) {
  const questionnaire = questionnaires.find((q) => q.resource.id === id);
  return questionnaire
    ? NextResponse.json(questionnaire, { status: 200 })
    : NextResponse.json({ error: 'not found' }, { status: 404 });
}
