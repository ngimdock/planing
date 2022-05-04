import { Fragment } from 'react';
import Navigation from './router';
import "./css/index.css"
import NavigationProvider from './datamanager/providers/navigationProvider';
import ModalProvider from './datamanager/providers/modalProvider';
import CurrentUserProvider from './datamanager/providers/currentUserProvider';
import ToastProvider from './datamanager/providers/toastProvider';
import PlanningNavigationProvider from './datamanager/providers/planningNavigationProvider';

function App() {
  return (
    <Fragment>
      <CurrentUserProvider>
        <NavigationProvider>
          <ModalProvider>
            <PlanningNavigationProvider>
              <ToastProvider>
                <Navigation />
              </ToastProvider>
            </PlanningNavigationProvider>
          </ModalProvider>
        </NavigationProvider>
      </CurrentUserProvider>
    </Fragment>
  );
}

export default App;
