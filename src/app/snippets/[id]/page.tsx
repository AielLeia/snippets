import { db } from '@/db';
import { notFound } from 'next/navigation';

type SnippetShowPageProps = {
  params: {
    id: string;
  };
};

export default async function SnippetShowPage({
  params: { id },
}: SnippetShowPageProps) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const snippet = await db.snippet.findFirst({ where: { id: parseInt(id) } });

  if (!snippet) {
    return notFound();
  }

  return <div>{snippet.title}</div>;
}
