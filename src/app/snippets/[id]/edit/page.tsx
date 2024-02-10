import { db } from '@/db';
import { notFound } from 'next/navigation';

import SnippetEditForm from '@/components/snippet-edit-form';

type SnippetEditPageProps = {
  params: {
    id: string;
  };
};

export default async function SnippetEditPage({
  params: { id },
}: SnippetEditPageProps) {
  const convertedId = parseInt(id);

  const snippet = await db.snippet.findFirst({ where: { id: convertedId } });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
