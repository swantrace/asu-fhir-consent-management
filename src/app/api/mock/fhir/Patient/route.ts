import { NextResponse } from 'next/server';
export function GET(request: Request) {
  console.log('request: ', request);
  return NextResponse.json({ hello: 'world' });
}
