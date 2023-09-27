import IconWrapper, { type IconProps } from './icon-wrapper';

export default function UndoRegular(props: IconProps) {
    return (
        <IconWrapper {...props}>
            <rect width='256' height='256' fill='none' />
            <polyline
                points='88 152 24 152 24 88'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <path
                d='M224,184A96,96,0,0,0,60.12,116.12L24,152'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
        </IconWrapper>
    );
}
