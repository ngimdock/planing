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
import RoomProvider from './datamanager/providers/roomProvider';
import ClassProvider from './datamanager/providers/classProvider';

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
                        <RoomProvider>
                          <ClassProvider>
                            <Navigation />
                          </ClassProvider>
                        </RoomProvider>
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
