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
import SubjectProvider from './datamanager/providers/subjectProvider';
import PlanningProvider from './datamanager/providers/planningProvider';
import { ExportProvider } from './datamanager/providers/exportProvider';

function App() {
  return (
    <Fragment>
      <CurrentUserProvider>
        <NavigationProvider>
          <ModalProvider>
            <PlanningNavigationProvider>
              <ToastProvider>
                <PlanningProvider>
                  <ExportProvider>
                    <FacultyProvider>
                      <LevelProvider>
                        <SpecialityProvider>
                          <TeacherProvider>
                            <RoomProvider>
                              <ClassProvider>
                                <SubjectProvider>
                                  <Navigation />
                                </SubjectProvider>
                              </ClassProvider>
                            </RoomProvider>
                          </TeacherProvider>
                        </SpecialityProvider>
                      </LevelProvider>
                    </FacultyProvider>
                  </ExportProvider>
                </PlanningProvider>
              </ToastProvider>
            </PlanningNavigationProvider>
          </ModalProvider>
        </NavigationProvider>
      </CurrentUserProvider>
    </Fragment>
  );
}

export default App;
