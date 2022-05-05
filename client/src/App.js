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
import SpecialityProvider from './datamanager/providers/specialityProvider';
import TeacherProvider from './datamanager/providers/teacherProvider';

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
                    <SpecialityProvider>
                      <TeacherProvider>
                        <Navigation />
                      </TeacherProvider>
                    </SpecialityProvider>
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
