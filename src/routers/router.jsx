import { Redirect, Route, Switch } from 'wouter';
import { umamiShareUrl } from '@/modules/services/umami';
import { ExternalRedirect } from '@/modules/core/components/external-redirect';

import { NotFound } from '@/modules/main/pages/not-found';

import { Home } from '@/modules/main/pages/home';
import { BooksAll } from '@/modules/secret/pages/books-all';
import { BooksEdit } from '@/modules/secret/pages/book-edit';
import { UsersAll } from '@/modules/secret/pages/users-all';

const UmamiRedirect = () => <ExternalRedirect to={umamiShareUrl} />;
const SecretRoot = () => <Redirect to='/secret/books' />;

export const Router = () => (
    <Switch>
        <Route path='/' component={Home} />

        <Route path='/secret' component={SecretRoot} />
        <Route path='/secret/books' component={BooksAll} />
        <Route path='/secret/books/:bookId' component={BooksEdit} />
        <Route path='/secret/users' component={UsersAll} />

        <Route path='/umami' component={UmamiRedirect} />
        <Route component={NotFound} />
    </Switch>
);
