'use client';
import { Card, CardBody } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Accordion, AccordionItem } from '@nextui-org/accordion';

import PlusIcon from '@/icons/plus-bold';
import ClosedIcon from '@/icons/closed-bold';
import SaveIcon from '@/icons/floppy-disk-regular';
import ImagePicker from './image-picker';

export default function CreateGuestbook() {
    return (
        <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50' shadow='sm'>
            <CardBody className='py-1 px-2'>
                <Accordion defaultExpandedKeys={['theme']}>
                    <AccordionItem
                        key='theme'
                        indicator={({ isOpen }) => (isOpen ? <ClosedIcon /> : <PlusIcon />)}
                        title='Nuevo Guestbook'
                    >
                        <div className='flex flex-col gap-4 pb-2'>
                            <div className='flex flex-row gap-2'>
                                <div className='flex-none'>
                                    <ImagePicker />
                                </div>

                                <Divider orientation='vertical' />

                                <div className='flex-1 flex flex-col gap-4'>
                                    <Input
                                        label='Nombre del evento'
                                        variant='bordered'
                                        type='text'
                                        size='lg'
                                    />
                                    <Input
                                        label='Fecha del evento'
                                        placeholder='Selecciona una fecha '
                                        description='Es la fecha en la que se llevará o llevó a cabo el evento.'
                                        variant='bordered'
                                        type='date'
                                    />
                                </div>
                            </div>

                            <Divider orientation='horizontal' />

                            <div className='flex justify-end'>
                                <Button color='primary' endContent={<SaveIcon />}>
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
