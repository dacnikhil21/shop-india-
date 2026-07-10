import React from 'react';
import { AppProvider } from './context/AppContext';
import { useIsMobile } from './hooks/useMediaQuery';
import { DesktopApp } from './components/desktop/DesktopApp';
import { MobileApp } from './components/mobile/MobileApp';

const MainLayout: React.FC = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileApp /> : <DesktopApp />;
};

function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;

