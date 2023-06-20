import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import questionnaireResponses from '../../../../../../../lib/mock/QuestionnaireResponse';

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
      resource: {
        ...originalQuestionnaireResponse?.resource,
        ...body.resource
      }
    };
    const updatedQuestionnaireResponses = questionnaireResponses.map((qr) => {
      if (qr.resource.id === id) {
        return updatedQuestionnaireResponse;
      }
      return qr;
    });
    await fs.writeFile(
      './lib/mock/QuestionnaireResponse.ts',
      `const questionnaireResponses = ${JSON.stringify(
        updatedQuestionnaireResponses,
        null,
        2
      )};\nexport default questionnaireResponses;\n`
    );
    return NextResponse.json(updatedQuestionnaireResponse, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
