import PuffLoader from 'react-spinners/PuffLoader';

export const Loader = () => {
    return (
        <div className='fixed z-max inset-0 flex items-center justify-center bg-white'>
            <PuffLoader />
        </div>
    );
};
