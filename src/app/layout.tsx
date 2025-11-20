import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import { Toaster } from 'sonner';
// import '@asseinfo/react-kanban/dist/styles.css';
// import '/public/styles/Plugins.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
        <AppWrappers>{children}</AppWrappers>
        <Toaster duration={5000} position='top-right'/>
      </body>
    </html>
  );
}
