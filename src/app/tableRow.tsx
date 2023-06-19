'use client';

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  return (
    <TableRow
      className="hover:bg-gray-100 cursor-pointer"
      onClick={() => router.push(`/qrs/${id}`)}
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
