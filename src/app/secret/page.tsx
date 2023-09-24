import MainContainer from '@/components/main-container';
import MainHeader from '@/components/main-header';
import CreateGuestbook from '@/components/create-guestbook';

export const dynamic = 'force-dynamic';

export default async function Secret() {
    return (
        <MainContainer>
            <MainHeader />
            <CreateGuestbook />
        </MainContainer>
    );
}
