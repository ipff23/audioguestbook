import IconWrapper, { type IconProps } from './icon-wrapper';

export default function EyeRegular(props: IconProps) {
    return (
        <IconWrapper {...props}>
            <rect width='256' height='256' fill='none' />
            <path
                d='M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
            <circle
                cx='128'
                cy='128'
                r='40'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
            />
        </IconWrapper>
    );
}
