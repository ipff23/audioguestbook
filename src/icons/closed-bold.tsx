import IconWrapper, { type IconProps } from './icon-wrapper';

export default function ClosedBold(props: IconProps) {
    return (
        <IconWrapper {...props}>
            <rect width='256' height='256' fill='none' />
            <line
                x1='200'
                y1='56'
                x2='56'
                y2='200'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='24'
            />
            <line
                x1='200'
                y1='200'
                x2='56'
                y2='56'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='24'
            />
        </IconWrapper>
    );
}
