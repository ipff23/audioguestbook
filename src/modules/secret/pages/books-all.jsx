import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

import { Eye, Pencil, Plus } from 'lucide-react';

import { readAllBooksQueery } from '@/modules/secret/actions/books-read-mutation';

import { Layout } from '@/modules/secret/components/layout';
import { WithAuth } from '@/modules/secret/components/with-auth';
import { BookCreate, useBookCreateDialogController } from '@/modules/secret/dialogs/book-create';

import { Button } from '@/modules/shadcn/ui/button';
import { Skeleton } from '@/modules/shadcn/ui/skeleton';

export const BooksAll = () => {
    const [, showCreateDialog] = useBookCreateDialogController();

    const { data: books = [], isLoading } = useQuery(readAllBooksQueery());

    return (
        <WithAuth>
            <Layout title='Todos los Books'>
                <BookCreate />

                <header className='flex items-center justify-between p-4'>
                    <h1 className='font-bold uppercase'>Todos los Books</h1>
                    <div className='flex items-center gap-2'>
                        <Button onClick={() => showCreateDialog(true)}>
                            <Plus />
                            Crear
                        </Button>
                    </div>
                </header>

                {isLoading && <Skeleton className='h-48 w-full' />}

                <div className='flex flex-wrap gap-4 p-4'>
                    {books.map(book => (
                        <article
                            key={book.id}
                            className='group relative overflow-hidden rounded-lg border'
                        >
                            <div className='relative w-48 aspect-square overflow-hidden'>
                                <img
                                    src={book.cover}
                                    className='h-full w-full object-cover transition-transform group-hover:scale-105'
                                />
                                <div className='absolute top-2 right-2 flex gap-2'>
                                    <Button variant='secondary' size='icon' asChild>
                                        <a href={`/book/${book.id}`} target='_blank'>
                                            <Eye />
                                        </a>
                                    </Button>
                                    <Button variant='secondary' size='icon' asChild>
                                        <a href={`/secret/books/${book.id}`}>
                                            <Pencil />
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div className='p-4'>
                                <h3 className='font-medium'>{book.name}</h3>
                                <p className='text-sm text-muted-foreground'>
                                    {format(book.date, 'PPP')}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </Layout>
        </WithAuth>
    );
};
