import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const patientId = new URL(request.url).searchParams.get('patientId');
  const questionnaireResponses = await fetch(
    `${process.env.NEXTAUTH_URL}/json/responses.json`,
    {
      cache: 'no-cache'
    }
  ).then((response) => response.json());
  return NextResponse.json(
    questionnaireResponses.filter(
      (qr: any) => qr.resource.subject.reference === `Patient/${patientId}`
    )
  );
}
