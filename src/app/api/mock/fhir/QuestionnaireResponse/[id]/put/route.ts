import { NextResponse } from 'next/server';
import merge from 'lodash.merge';
import { revalidatePath } from 'next/cache';
import { kv } from '@vercel/kv';

export const fetchCache = 'force-no-store';
export const runtime = 'edge';

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const questionnaireResponses = (await kv.get('qrs')) as any[];
    const originalQuestionnaireResponse = questionnaireResponses.find(
      (qr: any) => qr.resource.id === id
    );
    const body = await request.json();
    const updatedQuestionnaireResponse = {
      ...originalQuestionnaireResponse,
      resource: merge(
        originalQuestionnaireResponse?.resource ?? {},
        body?.resource ?? {}
      )
    };
    if (
      body?.resource?.authored &&
      updatedQuestionnaireResponse?.resource?.meta?.lastUpdated
    ) {
      updatedQuestionnaireResponse.resource.meta.lastUpdated =
        body.resource.authored;
    }
    const updatedQuestionnaireResponses = questionnaireResponses.map(
      (qr: any) => {
        if (qr.resource.id === id) {
          return updatedQuestionnaireResponse;
        }
        return qr;
      }
    );

    await kv.set('qrs', updatedQuestionnaireResponses);

    revalidatePath(
      `${process.env.NEXT_PUBLIC_FHIR_SERVER_BASE_URL}/QuestionnaireResponse/${id}/get`
    );
    revalidatePath(`${process.env.NEXT_PUBLIC_FHIR_SERVER_BASE_URL}/Patient`);
    return NextResponse.json(updatedQuestionnaireResponse, { status: 200 });
  } catch (e) {
    console.log('e', e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
