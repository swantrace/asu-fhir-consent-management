import { NextResponse } from 'next/server';
import patients from '../../../../../lib/mock/Patient';

export const revalidate = 60 * 60 * 24; // 24 hours

export async function GET(request: Request) {
  const patient = patients.find((patient) =>
    patient.resource.identifier
      .map((i) => i?.value ?? false)
      .filter((i) => i)
      .includes(`mailto:${new URL(request.url).searchParams.get('identifier')}`)
  );
  const questionnaireResponses = await fetch(
    `${process.env.NEXTAUTH_URL}/json/responses.json`,
    {
      cache: 'no-cache'
    }
  ).then((response) => response.json());

  return patient
    ? NextResponse.json(
        {
          ...patient,
          questionnaireResponses: questionnaireResponses.filter(
            (qr: any) =>
              qr.resource.subject.reference === `Patient/${patient.resource.id}`
          )
        },
        { status: 200 }
      )
    : NextResponse.json({ error: 'not found' }, { status: 404 });
}
