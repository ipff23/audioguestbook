import IconWrapper, { type IconProps } from './icon-wrapper';

export default function PlusBold(props: IconProps) {
    return (
        <IconWrapper {...props}>
            <rect width='256' height='256' fill='none' />
            <line
                x1='40'
                y1='128'
                x2='216'
                y2='128'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='24'
            />
            <line
                x1='128'
                y1='40'
                x2='128'
                y2='216'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='24'
            />
        </IconWrapper>
    );
}
