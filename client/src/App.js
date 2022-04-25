import { Fragment } from 'react';
import Navigation from './router';
import "./css/index.css"
import NavigationProvider from './datamanager/providers/navigationProvider';
import ModalProvider from './datamanager/providers/modalProvider';

function App() {
  return (
    <Fragment>
      <NavigationProvider>
        <ModalProvider>
          <Navigation />
        </ModalProvider>
      </NavigationProvider>
    </Fragment>
  );
}

export default App;
