import { NextResponse } from 'next/server';
import getCollection from '@/app/utils/mgdb';

//redirect
export async function GET(
    _req: Request,{ params }: 
    { params: { alias: string } }
) {
  const col = await getCollection();
  const doc = await col.findOne({ alias: params.alias });
  if (!doc) return new NextResponse('nope', { status: 404 });
  return NextResponse.redirect(doc.url);
}