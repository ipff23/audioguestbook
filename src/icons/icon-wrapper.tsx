import { type ReactNode, type JSX, type SVGProps } from 'react';

export type SvgProps = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>;

export interface IconProps extends SvgProps {
    viewBox?: string;
    size?: string;
}

export interface IconWrapperProps extends IconProps {
    children: ReactNode;
}

export default function IconWrapper({
    children,
    size = '1.2em',
    viewBox = '0 0 256 256',
    ...props
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
