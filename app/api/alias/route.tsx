import { NextResponse } from 'next/server';
import getCollection from '@/app/utils/mgdb';

interface Body {
  url: string;
  alias: string;
}
//post
export async function POST(req: Request) {
  const { url, alias } = (await req.json()) as Body;

  //check URL valid
  try {
    new URL(url);
  } catch {
    return NextResponse.json({ msg: 'invalid url' }, { status: 400 });
  }


  //insert check
  const col = await getCollection();
  const record={
    url,
    alias,
    shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${alias}`
  }
  const exists = await col.findOne({ alias });
  if (exists) return NextResponse.json({ msg: 'alias taken' }, { status: 409 });
  const dbRes = await col.insertOne(record);
  if (!dbRes.acknowledged) return NextResponse.json({msg:'insert failed'}, {status: 500})
  return NextResponse.json({ ...record, id: dbRes.insertedId.toHexString() });
}