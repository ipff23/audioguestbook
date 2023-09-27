'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequest } from 'ahooks';

import { Card, CardBody } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Accordion, AccordionItem } from '@nextui-org/accordion';

import PlusIcon from '@/icons/plus-bold';
import ClosedIcon from '@/icons/closed-bold';
import SaveIcon from '@/icons/floppy-disk-regular';

import ImagePicker from './image-picker';

const createBooksService = async ({
    name,
    date,
    cover,
}: {
    name: string;
    date: string;
    cover: File;
}) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('date', date);
    formData.append('cover', cover);

    const res = await fetch('/api/books', {
        method: 'POST',
        body: formData,
    });

    return res;
};

export default function CreateBook() {
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [cover, setCover] = useState<File | null>(null);

    const canSubmit = name !== '' && date !== '' && cover !== null;

    const closeAccordion = () => setSelectedKeys([]);
    const openAccordion = () => setSelectedKeys(['theme']);

    const resetFields = () => {
        setName('');
        setDate('');
        setCover(null);
    };

    const toggleAccordion = () => {
        if (selectedKeys.length) {
            closeAccordion();
        } else {
            openAccordion();
        }
    };

    const handleCreate = () => {
        run({
            name,
            date,
            cover: cover as File,
        });
    };

    const { run, loading } = useRequest(createBooksService, {
        manual: true,
        onSuccess: () => {
            router.refresh();
            closeAccordion();
            resetFields();
        },
        onError: error => {
            console.log({ error });
        },
    });

    return (
        <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50' shadow='sm'>
            <CardBody className='py-1 px-2'>
                <Accordion selectedKeys={selectedKeys}>
                    <AccordionItem
                        key='theme'
                        indicator={({ isOpen }) => (isOpen ? <ClosedIcon /> : <PlusIcon />)}
                        title='Nuevo Guestbook'
                        onPress={toggleAccordion}
                    >
                        <div className='flex flex-col gap-4 pb-2'>
                            <div className='flex flex-row gap-4'>
                                <div className='flex-none'>
                                    <ImagePicker
                                        disabled={loading}
                                        onChange={file => setCover(file)}
                                    />
                                </div>

                                <div className='flex-1 flex flex-col gap-4'>
                                    <Input
                                        label='Nombre del evento'
                                        variant='bordered'
                                        type='text'
                                        size='lg'
                                        value={name}
                                        onChange={ev => setName(ev.target.value)}
                                        disabled={loading}
                                    />
                                    <Input
                                        label='Fecha del evento'
                                        placeholder='Selecciona una fecha '
                                        description='Es la fecha en la que se llevará o llevó a cabo el evento.'
                                        variant='bordered'
                                        type='date'
                                        value={date}
                                        onChange={ev => setDate(ev.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <Divider orientation='horizontal' />

                            <div className='flex justify-end'>
                                <Button
                                    color='primary'
                                    endContent={<SaveIcon />}
                                    onClick={handleCreate}
                                    isLoading={loading}
                                    isDisabled={loading || !canSubmit}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>
    );
}
