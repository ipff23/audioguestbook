import MainContainer from '@/components/main-container';
import MainHeader from '@/components/main-header';

import CreateBook from './components/create-book';
import BooksList from './components/books-list';

export const dynamic = 'force-dynamic';

export default async function Secret() {
    return (
        <MainContainer>
            <MainHeader />
            <CreateBook />
            <BooksList />
        </MainContainer>
    );
}
