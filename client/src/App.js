import { Fragment } from 'react';
import Navigation from './router';
import "./css/index.css"
import NavigationProvider from './datamanager/providers/navigationProvider';
import ModalProvider from './datamanager/providers/modalProvider';
import CurrentUserProvider from './datamanager/providers/currentUserProvider';

function App() {
  return (
    <Fragment>
      <CurrentUserProvider>
        <NavigationProvider>
          <ModalProvider>
            <Navigation />
          </ModalProvider>
        </NavigationProvider>
      </CurrentUserProvider>
    </Fragment>
  );
}

export default App;
