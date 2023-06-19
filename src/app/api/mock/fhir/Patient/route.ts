import { NextResponse } from 'next/server';
import patients from '../../../../../lib/mock/Patient';
import questionnaireResponses from '../../../../../lib/mock/QuestionnaireResponse';

export function GET(request: Request) {
  const patient = patients.find((patient) =>
    patient.resource.identifier
      .map((i) => i?.value ?? false)
      .filter((i) => i)
      .includes(`mailto:${new URL(request.url).searchParams.get('identifier')}`)
  );
  return patient
    ? NextResponse.json(
        {
          ...patient,
          questionnaireResponses: questionnaireResponses.filter(
            (qr) =>
              qr.resource.subject.reference === `Patient/${patient.resource.id}`
          )
        },
        { status: 200 }
      )
    : NextResponse.json({ error: 'not found' }, { status: 404 });
}
