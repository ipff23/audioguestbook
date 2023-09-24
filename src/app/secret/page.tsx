import MainContainer from '@/components/main-container';
import MainHeader from '@/components/main-header';

export const dynamic = 'force-dynamic';

export default async function Secret() {
    return (
        <MainContainer>
            <MainHeader />
        </MainContainer>
    );
}
