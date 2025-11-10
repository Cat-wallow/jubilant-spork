'use client';

import React, { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import DashIcon from 'components/icons/DashIcon';

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  const pathname = usePathname();
  const { routes } = props;
  const [openCollapse, setOpenCollapse] = useState<string | null>(null);

  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      const isActive = activeRoute(route.path);

      if (
        route.layout === '/admin' ||
        route.layout === '/auth' ||
        route.layout === '/rtl'
      ) {
        return (
          <div key={index}>
            <NavLink href={route.layout + '/' + route.path}>
              <div className="group relative flex w-full items-center gap-[73px] hover:cursor-pointer">
                <div className="flex flex-1 items-center gap-[15px]">
                  <span
                    className={`flex h-6 w-6 items-center justify-center ${
                      isActive
                        ? 'text-[#332687]'
                        : 'text-[#A3AED0] group-hover:text-[#332687]'
                    }`}
                  >
                    {route.icon ? route.icon : <DashIcon />}
                  </span>
                  <p
                    className={`font-dm text-base leading-[30px] tracking-[-0.32px] ${
                      isActive
                        ? 'font-bold text-[#332687]'
                        : 'font-normal text-[#A3AED0] group-hover:text-[#332687]'
                    }`}
                  >
                    {route.name}
                  </p>
                </div>

                {isActive && (
                  <div className="h-9 w-1 flex-shrink-0 rounded-[25px] bg-[#332687]" />
                )}

                {route.collapse && !isActive && (
                  <svg
                    className="h-6 w-3 flex-shrink-0 text-[#A3AED0]"
                    viewBox="0 0 24 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.2889 10.1569L5.63186 4.49994L7.04586 3.08594L11.9959 8.03594L16.9459 3.08594L18.3599 4.49994L12.7029 10.1569C12.5153 10.3444 12.261 10.4497 11.9959 10.4497C11.7307 10.4497 11.4764 10.3444 11.2889 10.1569Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </div>
            </NavLink>
          </div>
        );
      }
    });
  };

  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
