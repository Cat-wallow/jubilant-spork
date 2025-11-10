'use client';

import React, { useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import DashIcon from 'components/icons/DashIcon';

interface SubMenuItem {
  name: string;
  path: string;
}

const subMenuItems: SubMenuItem[] = [
  { name: 'Semua form 1.0 (DMS)', path: 'form-1' },
  { name: 'Semua KK 1.0', path: 'kk-1' },
  { name: 'Semua KK 2.0', path: 'kk-2' },
  { name: 'Semua KK 3.0', path: 'kk-3' },
  { name: 'Semua KK 4.0', path: 'kk-4' },
  { name: 'Semua KK 5.0', path: 'kk-5' },
];

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  const pathname = usePathname();
  const { routes } = props;
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {},
  );

  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  const toggleMenu = (routePath: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [routePath]: !prev[routePath],
    }));
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      const isActive = activeRoute(route.path);
      const isExpanded = expandedMenus[route.path];
      const hasCollapse = route.collapse;

      if (
        route.layout === '/admin' ||
        route.layout === '/auth' ||
        route.layout === '/rtl'
      ) {
        return (
          <div key={index}>
            <div
              onClick={() => hasCollapse && toggleMenu(route.path)}
              className={hasCollapse ? 'cursor-pointer' : ''}
            >
              {hasCollapse ? (
                <div className="group relative flex w-full items-center gap-[73px] hover:cursor-pointer">
                  <div className="flex flex-1 items-center gap-[15px]">
                    <span
                      className={`flex h-6 w-6 items-center justify-center ${
                        isActive || isExpanded
                          ? 'text-brand-500 dark:text-white'
                          : 'text-gray-600 group-hover:text-brand-500 dark:text-gray-400 dark:group-hover:text-white'
                      }`}
                    >
                      {route.icon ? route.icon : <DashIcon />}
                    </span>
                    <p
                      className={`font-dm text-base leading-[30px] tracking-[-0.32px] ${
                        isActive || isExpanded
                          ? 'font-bold text-brand-500 dark:text-white'
                          : 'font-normal text-gray-600 group-hover:text-brand-500 dark:text-gray-400 dark:group-hover:text-white'
                      }`}
                    >
                      {route.name}
                    </p>
                  </div>

                  {isActive && !isExpanded && (
                    <div className="h-9 w-1 flex-shrink-0 rounded-[25px] bg-brand-500 dark:bg-brand-400" />
                  )}

                  {hasCollapse && (
                    <svg
                      className={`h-6 w-3 flex-shrink-0 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      } ${
                        isActive || isExpanded
                          ? 'text-brand-500 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
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
              ) : (
                <NavLink href={route.layout + '/' + route.path}>
                  <div className="group relative flex w-full items-center gap-[73px] hover:cursor-pointer">
                    <div className="flex flex-1 items-center gap-[15px]">
                      <span
                        className={`flex h-6 w-6 items-center justify-center ${
                          isActive
                            ? 'text-brand-500 dark:text-white'
                            : 'text-gray-600 group-hover:text-brand-500 dark:text-gray-400 dark:group-hover:text-white'
                        }`}
                      >
                        {route.icon ? route.icon : <DashIcon />}
                      </span>
                      <p
                        className={`font-dm text-base leading-[30px] tracking-[-0.32px] ${
                          isActive
                            ? 'font-bold text-brand-500 dark:text-white'
                            : 'font-normal text-gray-600 group-hover:text-brand-500 dark:text-gray-400 dark:group-hover:text-white'
                        }`}
                      >
                        {route.name}
                      </p>
                    </div>

                    {isActive && (
                      <div className="h-9 w-1 flex-shrink-0 rounded-[25px] bg-brand-500 dark:bg-brand-400" />
                    )}
                  </div>
                </NavLink>
              )}
            </div>

            {hasCollapse && isExpanded && (
              <div className="ml-[39px] mt-2 flex w-[247px] flex-col">
                {subMenuItems.map((item, subIndex) => (
                  <NavLink
                    key={subIndex}
                    href={route.layout + '/' + item.path}
                  >
                    <div className="flex items-center gap-[15px] py-[3px] px-[10px] hover:bg-gray-50 dark:hover:bg-navy-700">
                      <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="2"
                          cy="2"
                          r="2"
                          transform="matrix(1 0 0 -1 10 14)"
                          fill="#637381"
                        />
                      </svg>
                      <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-sans text-sm font-medium leading-[22px] text-gray-600 dark:text-gray-400">
                        {item.name}
                      </p>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      }
    });
  };

  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
