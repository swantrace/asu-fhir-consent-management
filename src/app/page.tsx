import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const users = [
    { id: 1, name: 'test', username: 'test', email: 'test@test.com' },
    { id: 2, name: 'test2', username: 'test2', email: 'test2@test.com' }
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6">
        {/* @ts-expect-error Server Component */}
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
