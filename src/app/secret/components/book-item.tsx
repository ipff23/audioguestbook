import { format } from 'date-fns';

import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';

import EyeIcon from '@/icons/eye-regular';
import PencilIcon from '@/icons/pencil-regular';

export interface BookItemProps {
    id: string;
    nanoid: string;
    name: string;
    date: string;
    cover: string;
}

export default function BookItem({ id, nanoid, name, date, cover }: BookItemProps) {
    return (
        <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50'>
            <CardBody className='flex flex-row gap-3 items-center'>
                <Image
                    src={cover}
                    className='w-[52px] h-[52px] object-cover'
                    height={52}
                    width={52}
                    radius='sm'
                />
                <div className='flex flex-col flex-1'>
                    <p className='text-md break-all hyphens-auto line-clamp-1'>{name}</p>
                    <p className='text-small text-default-500'>
                        {format(new Date(date), 'MMMM do, yyyy')}
                    </p>
                </div>
                <Button
                    as={Link}
                    href={`/book/${nanoid}`}
                    variant='flat'
                    color='primary'
                    isIconOnly
                    isExternal
                >
                    <EyeIcon />
                </Button>

                <Button as={Link} href={`/secret/book/${id}`} variant='flat' isIconOnly>
                    <PencilIcon />
                </Button>
            </CardBody>
        </Card>
    );
}
