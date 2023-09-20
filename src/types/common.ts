import { ReactNode, JSX, SVGProps } from 'react';

export type ChildrenContainer = {
    children: ReactNode;
};

export type IconProps = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>;
