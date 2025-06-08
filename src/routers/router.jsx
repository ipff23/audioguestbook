import { Route, Switch } from 'wouter';
import { umamiShareUrl } from '@/modules/services/umami';
import ExternalRedirect from '@/modules/core/components/external-redirect';

import { NotFound } from '@/modules/main/pages/not-found';

import { Home } from '@/modules/main/pages/home';
import { Dashboard } from '@/modules/secret/pages/dashboard';

const UmamiRedirect = () => <ExternalRedirect to={umamiShareUrl} />;

export const Router = () => (
    <Switch>
        <Route path='/' component={Home} />
        <Route path='/secret' component={Dashboard} />

        <Route path='/umami' component={UmamiRedirect} />
        <Route component={NotFound} />
    </Switch>
);
