import { type ReactNode, type JSX, type SVGProps } from 'react';

export type IconProps = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>;

export interface IconWrapperProps {
    children: ReactNode;
    props: IconProps;
    viewBox?: string;
    size?: string;
}

export default function IconWrapper({
    children,
    props,
    size = '1.2em',
    viewBox = '0 0 256 256',
}: IconWrapperProps) {
    return (
        <svg
            height={size}
            width={size}
            viewBox={viewBox}
            fill='currentColor'
            aria-hidden='true'
            focusable='false'
            role='presentation'
            {...props}
        >
            {children}
        </svg>
    );
}
