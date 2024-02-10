'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnippet(id: number, newCode: string) {
  await db.snippet.update({
    where: { id },
    data: { code: newCode },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({ where: { id } });

  redirect('/');
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get('title');
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3) {
      return {
        message: 'Title must be longer',
      };
    }

    if (typeof code !== 'string' || code.length < 10) {
      return {
        message: 'Code must be longer',
      };
    }

    await db.snippet.create({
      data: { title, code },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { message: e.message };
    }

    return {
      message: 'Something went wrong ...',
    };
  }

  redirect('/');
}
