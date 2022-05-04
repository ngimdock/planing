import { Fragment } from 'react';
import Navigation from './router';
import "./css/index.css"
import NavigationProvider from './datamanager/providers/navigationProvider';
import ModalProvider from './datamanager/providers/modalProvider';
import CurrentUserProvider from './datamanager/providers/currentUserProvider';
import ToastProvider from './datamanager/providers/toastProvider';
import PlanningNavigationProvider from './datamanager/providers/planningNavigationProvider';
import FacultyProvider from './datamanager/providers/facultyProvider';
import LevelProvider from './datamanager/providers/levelProvider';

function App() {
  return (
    <Fragment>
      <CurrentUserProvider>
        <NavigationProvider>
          <ModalProvider>
            <PlanningNavigationProvider>
              <ToastProvider>
                <FacultyProvider>
                  <LevelProvider>
                    <Navigation />
                  </LevelProvider>
                </FacultyProvider>
              </ToastProvider>
            </PlanningNavigationProvider>
          </ModalProvider>
        </NavigationProvider>
      </CurrentUserProvider>
    </Fragment>
  );
}

export default App;
