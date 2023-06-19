import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import ResponseTableRow from './tableRow';

interface QuestionnaireResponse {
  resource: {
    status: string;
    id: string;
    meta: {
      lastUpdated: string;
    };
  };
  questionnaire: {
    resource: {
      title: string;
    };
  };
}

export default async function QuestionnaireResponsesTable({
  questionnaireResponses
}: {
  questionnaireResponses: QuestionnaireResponse[];
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>LastUpdated</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {questionnaireResponses.map((qr) => (
          <ResponseTableRow
            key={qr.resource.id}
            id={qr.resource.id}
            title={qr.questionnaire.resource.title}
            status={qr.resource.status}
            lastUpdated={new Date(
              qr.resource.meta.lastUpdated
            ).toLocaleString()}
          />
        ))}
      </TableBody>
    </Table>
  );
}
