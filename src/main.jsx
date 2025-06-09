import { createRoot } from 'react-dom/client';

import './index.css';

import { Router } from './routers/router';
import { Providers } from './modules/core/providers/providers';

const Main = () => (
    <Providers>
        <Router />
    </Providers>
);

createRoot(document.getElementById('root')).render(<Main />);
