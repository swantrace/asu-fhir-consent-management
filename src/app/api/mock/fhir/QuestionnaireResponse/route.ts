import { NextResponse } from 'next/server';
import questionnaireResponses from '../../../../../lib/mock/QuestionnaireResponse';

export const runtime = 'edge';

export function GET(request: Request) {
  const patientId = new URL(request.url).searchParams.get('patientId');
  return NextResponse.json(
    questionnaireResponses.filter(
      (qr) => qr.resource.subject.reference === `Patient/${patientId}`
    )
  );
}
