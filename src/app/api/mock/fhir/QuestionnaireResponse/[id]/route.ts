import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import questionnaireResponses from '../../../../../../lib/mock/QuestionnaireResponse';
import questionnaires from '../../../../../../lib/mock/Questionnaire';

export function GET(
  _: Request,
  { params: { id } }: { params: { id: string } }
) {
  const questionnaireResponse = questionnaireResponses.find(
    (qr) => qr.resource.id === id
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
