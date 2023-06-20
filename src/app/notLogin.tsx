'use client';

import { Button, Text } from '@tremor/react';

export default function NotLogin({ callbackUrl }: { callbackUrl: string }) {
  return (
    <>
      <Text className="">Not logged in</Text>
      <Button
        onClick={() => {
          window.location.href = `/api/auth/signin?callbackUrl=${callbackUrl}`;
        }}
      >
        Sign in
      </Button>
    </>
  );
}
