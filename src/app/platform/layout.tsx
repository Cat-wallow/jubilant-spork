'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import routes from 'routes';
import {
  getActiveNavbar,
  getActiveRoute,
  isWindowAvailable,
} from 'utils/navigation';
import React from 'react';
import Navbar from 'components/navbar';
import Sidebar from 'components/sidebar';
import Footer from 'components/footer/Footer';
import RBAC from 'components/rbac/RBAC';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (isWindowAvailable()) document.documentElement.dir = 'ltr';

  return (
    <RBAC redirect>
      <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
        <Sidebar
          routes={routes}
          open={open}
          setOpen={setOpen}
          variant="admin"
        />
        <div className="h-full w-full font-dm dark:bg-navy-900">
          <main className="mx-2.5 flex-none transition-all dark:bg-navy-900 md:pr-2 xl:ml-[323px]">
            <div>
              <Navbar
                onOpenSidenav={() => setOpen(!open)}
                brandText={getActiveRoute(routes, pathname)}
                secondary={getActiveNavbar(routes, pathname)}
              />
              <div className="mx-auto min-h-screen p-2 !pt-[4px] md:p-2">
                {children}
              </div>
              <div className="p-3">
                <Footer />
              </div>
            </div>
          </main>
        </div>
      </div>
    </RBAC>
  );
}
