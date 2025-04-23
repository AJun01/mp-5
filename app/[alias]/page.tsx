import { redirect } from 'next/navigation';
import getCollection from '@/app/utils/mgdb';     

export default async function Redirect({
  params,
}: {
params: Promise<{ alias: string}>;
}) {
  const col = await getCollection();
  const doc = await col.findOne({ alias: (await params).alias })
  if (!doc) redirect('/');                  
  redirect(doc.url);                        
}