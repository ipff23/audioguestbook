import IconWrapper, { type IconProps } from './icon-wrapper';

export default function DragHandleRegular(props: IconProps) {
    return (
        <IconWrapper {...props}>
            <rect width='256' height='256' fill='none' />
            <circle cx='92' cy='60' r='12' />
            <circle cx='164' cy='60' r='12' />
            <circle cx='92' cy='128' r='12' />
            <circle cx='164' cy='128' r='12' />
            <circle cx='92' cy='196' r='12' />
            <circle cx='164' cy='196' r='12' />
        </IconWrapper>
    );
}
