import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const patientId = new URL(request.url).searchParams.get('patientId');
  const questionnaireResponses = (await kv.get('qrs')) as any[];
  return NextResponse.json(
    questionnaireResponses.filter(
      (qr: any) => qr.resource.subject.reference === `Patient/${patientId}`
    )
  );
}
