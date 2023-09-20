import { ReactNode, JSX, SVGProps } from 'react';

export type IconProps = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>;

export type IconWrapperProps = {
    children: ReactNode;
    props: IconProps;
};

export default function IconWrapper({ children, props }: IconWrapperProps) {
    return (
        <svg
            height='1em'
            width='1em'
            viewBox='0 0 256 256'
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
