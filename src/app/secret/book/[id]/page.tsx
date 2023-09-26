import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';

import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

import MainContainer from '@/layout/main-container';
import MainHeader from '@/layout/main-header';

import ExternalIcon from '@/icons/external-regular';
import SaveIcon from '@/icons/floppy-disk-regular';

import TrackList from '@/components/track-list';

export const dynamic = 'force-dynamic';

export default async function Secret({ params: { id } }: { params: { id: string } }) {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.from('books').select('*').eq('id', id).single();

    return (
        <MainContainer background={data.cover}>
            <MainHeader />

            <div className='flex flex-row gap-4 items-start'>
                <TrackList />

                <div className='flex-none h-auto flex flex-col gap-4'>
                    <Card
                        isBlurred
                        className='border-none bg-background/60 dark:bg-default-100/50'
                        shadow='sm'
                    >
                        <CardBody>
                            <div className='flex flex-col items-center'>
                                <Image
                                    className='object-cover w-[150px] h-[150px] self-center'
                                    src={data.cover}
                                    width={150}
                                    height={150}
                                    shadow='md'
                                />
                            </div>
                            <div className='mt-4 flex flex-col gap-2 items-start max-w-[160px]'>
                                <h1 className='text-lg leading-5 hyphens-auto' lang='es-MX'>
                                    {data.name}
                                </h1>
                                <p className='text-sm text-slate-400'>
                                    {format(new Date(data.date), 'MMMM do, yyyy')}
                                </p>
                                <Link
                                    href={`/book/${data.nanoid}`}
                                    isExternal
                                    showAnchorIcon
                                    anchorIcon={<ExternalIcon className='ml-1' size='1rem' />}
                                >
                                    {data.nanoid}
                                </Link>
                            </div>
                        </CardBody>
                    </Card>

                    <Button color='primary' endContent={<SaveIcon />}>
                        Guardar
                    </Button>
                </div>
            </div>
        </MainContainer>
    );
}
