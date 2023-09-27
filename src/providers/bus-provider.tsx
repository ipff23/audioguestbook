'use client';
import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { type ChildrenContainer } from '@/types/common';

type EventHandler = (...args: any[]) => void;
type Event = Record<string, EventHandler[]>;

export interface Bus {
    on: (eventName: string, eventHandler: EventHandler) => () => void;
    off: (eventName: string, eventHandler: EventHandler) => void;
    emit: (eventName: string, ...args: any[]) => void;
}

const defaultBusPayload = {
    on: (_: string, h: () => void) => () => {},
    off: (_: string, h: () => void) => {},
    emit: (_: string) => {},
};

const BusContext = createContext<Bus>(defaultBusPayload);

export const useEvents = () => {
    return useContext(BusContext);
};

export const useListener = (eventName: string, eventHandler: EventHandler) => {
    const { on } = useEvents();
    useEffect(() => {
        const unbind = on(eventName, eventHandler);
        return () => {
            unbind();
        };
    }, []);
};

export const useEmitter = (eventName: string, ...args: any[]) => {
    const { emit } = useEvents();

    const handleEmit = () => {
        emit(eventName, ...args);
    };

    return handleEmit;
};

export default function BusProvider({ children }: ChildrenContainer) {
    const $events = useRef<Event>({});

    const off = useCallback((eventName: string, eventHandler: EventHandler) => {
        $events.current[eventName] = $events.current[eventName]?.filter(e => eventHandler !== e);
    }, []);

    const on = useCallback((eventName: string, eventHandler: EventHandler): (() => void) => {
        $events.current[eventName] ??= [];
        $events.current[eventName].push(eventHandler);

        return () => off(eventName, eventHandler);
    }, []);

    const emit = useCallback((eventName: string, ...args: any[]) => {
        const handlers = $events.current[eventName] ?? [];
        handlers.forEach(handler => handler(...args));
    }, []);

    return <BusContext.Provider value={{ on, off, emit }}>{children}</BusContext.Provider>;
}
