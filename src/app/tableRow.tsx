'use client';

import { TableRow, TableCell, Text } from '@tremor/react';

export default function ResponseTableRow({
  id,
  title,
  status,
  lastUpdated
}: {
  id: string;
  title: string;
  status: string;
  lastUpdated: string;
}) {
  return (
    <TableRow
      className="hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        window.location.href = `/qrs/${id}`;
      }}
    >
      <TableCell>{title}</TableCell>
      <TableCell>
        <Text>{status}</Text>
      </TableCell>
      <TableCell>
        <Text>{lastUpdated}</Text>
      </TableCell>
    </TableRow>
  );
}
