'use client';
// Layout components
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import routes from '@/components/sidebar/routes';
import {
  getActiveNavbar,
  getActiveRoute,
  isWindowAvailable,
} from '@/utils/navigation';
import React from 'react';
import { Portal } from '@chakra-ui/portal';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import Footer from '@/components/footer/Footer';
import RBAC from '@/components/rbac/RBAC';

export default function Admin({ children }: { children: React.ReactNode }) {
  // states and functions
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (isWindowAvailable()) document.documentElement.dir = 'ltr';
  return (
    <RBAC redirect>
      <div className="bg-background-100 dark:bg-background-900 flex h-full w-full">
        <Sidebar
          routes={routes}
          open={open}
          setOpen={setOpen}
          variant="admin"
        />
        {/* Navbar & Main Content */}
        <div className="h-full w-full font-dm dark:bg-navy-900">
          {/* Main Content */}
          <main
            className={`mx-2.5  flex-none transition-all dark:bg-navy-900
              md:pr-2 xl:ml-[323px]`}
          >
            {/* Routes */}
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
