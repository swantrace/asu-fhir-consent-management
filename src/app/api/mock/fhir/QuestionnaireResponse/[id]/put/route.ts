import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import merge from 'lodash.merge';
import questionnaireResponses from '../../../../../../../lib/mock/QuestionnaireResponse';
import { revalidatePath } from 'next/cache';

export const fetchCache = 'force-no-store';

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const originalQuestionnaireResponse = questionnaireResponses.find(
      (qr) => qr.resource.id === id
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
    const updatedQuestionnaireResponses = questionnaireResponses.map((qr) => {
      if (qr.resource.id === id) {
        return updatedQuestionnaireResponse;
      }
      return qr;
    });
    const filePath = path.join(
      process.cwd(),
      '/src/lib/mock/QuestionnaireResponse.ts'
    );
    console.log('filePath', filePath);
    await fs.writeFile(
      filePath,
      `const questionnaireResponses = ${JSON.stringify(
        updatedQuestionnaireResponses,
        null,
        2
      )};\nexport default questionnaireResponses;\n`
    );

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
