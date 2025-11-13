'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';

// Tenant colors mapping - can be customized based on tenant type or other properties
const getTenantColor = (tenantName: string): string => {
  // Generate a consistent color based on tenant name hash
  const colors = [
    'linear-gradient(90deg, #AD46FF 0%, #615FFF 100%)',
    '#2B7FFF',
    '#00C950',
    '#F0B100',
    '#FF6900',
    '#6A7282',
  ];

  const hash = tenantName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  return colors[Math.abs(hash) % colors.length];
};

export default function TenantSwitcher() {
  const { tenant, currentRole, availableTenants, switchTenant, isLoading } =
    useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  console.log(isLoading);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTenantSelect = async (tenantId: string) => {
    // Don't do anything if selecting the same tenant
    if (tenantId === tenant?.id) {
      setIsOpen(false);
      return;
    }

    setIsSwitching(true);

    try {
      // Call the switchTenant function from AuthContext
      switchTenant({
        tenantId: tenantId,
      });

      setIsOpen(false);
    } catch (error) {
      console.error('Failed to switch tenant:', error);
      setIsSwitching(false);
    }
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="h-7 w-40 animate-pulse rounded-[5px] bg-gray-200 dark:bg-navy-700" />
    );
  }

  // Don't show tenant switcher if user only has one tenant or no tenants
  if (availableTenants.length <= 1) {
    // Show current tenant as static badge if user has exactly one tenant
    if (availableTenants.length === 1 && tenant) {
      return (
        <div className="inline-flex items-center justify-center gap-2.5 rounded-[5px] bg-[#EDECFC] px-[5px] dark:bg-navy-700">
          <span className="font-dm text-xs font-normal leading-[24px] tracking-[-0.24px] text-[#7887EE] dark:text-purple-300">
            {'halo'}
          </span>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isSwitching}
        className="inline-flex items-center justify-center gap-2.5 rounded-[5px] bg-[#EDECFC] px-[5px] transition-colors hover:bg-[#d8d5f7] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-navy-700 dark:hover:bg-navy-600"
      >
        <span className="font-dm text-xs font-normal leading-[24px] tracking-[-0.24px] text-[#7887EE] dark:text-purple-300">
          {isSwitching ? 'Switching...' : tenant.name}
        </span>
        {/* Dropdown indicator */}
        <svg
          className={`h-3 w-3 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && !isSwitching && (
        <div className="border-black/15 absolute left-0 top-full z-50 mt-2 flex w-[220px] flex-col gap-px rounded-[5.25px] border bg-white p-1 shadow-[0_4px_6px_4px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] dark:border-white/15 dark:bg-navy-800">
          <div className="flex h-[24.488px] items-start px-[7px] py-[5.25px]">
            <span className="font-inter text-slate-500 dark:text-slate-400 flex-1 text-[10.5px] font-bold leading-[14px]">
              Switch Organization
            </span>
          </div>

          {availableTenants.map((userTenant) => {
            const isCurrentTenant = userTenant.tenant.id === tenant?.id;
            const tenantColor = getTenantColor(userTenant.tenant.name);

            return (
              <button
                key={userTenant.tenant.id}
                onClick={() => handleTenantSelect(userTenant.tenant.id)}
                disabled={isCurrentTenant}
                className={`flex h-auto min-h-[32px] flex-col gap-0.5 rounded-[3.5px] px-[7px] py-2 transition-colors hover:bg-blue-50 disabled:cursor-default dark:hover:bg-navy-700 ${
                  isCurrentTenant ? 'bg-blue-50 dark:bg-navy-700' : ''
                }`}
              >
                <div className="flex w-full items-center gap-[7px]">
                  <div
                    className="h-[7px] w-[7px] flex-shrink-0 rounded-full"
                    style={{ background: tenantColor }}
                  />
                  <span className="font-inter text-slate-800 dark:text-slate-200 flex-1 text-start text-xs font-medium leading-[17.5px]">
                    {userTenant.tenant.name}
                  </span>

                  {isCurrentTenant && (
                    <svg
                      className="h-[14px] w-[14px]"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_965_93305)">
                        <path
                          d="M11.6666 7.58331C11.6666 10.5 9.62492 11.9583 7.19825 12.8041C7.07118 12.8472 6.93315 12.8451 6.80742 12.7983C4.37492 11.9583 2.33325 10.5 2.33325 7.58331V3.49998C2.33325 3.34527 2.39471 3.19689 2.50411 3.0875C2.6135 2.9781 2.76188 2.91664 2.91659 2.91664C4.08325 2.91664 5.54159 2.21664 6.55659 1.32998C6.68017 1.22439 6.83737 1.16638 6.99992 1.16638C7.16246 1.16638 7.31967 1.22439 7.44325 1.32998C8.46409 2.22248 9.91659 2.91664 11.0833 2.91664C11.238 2.91664 11.3863 2.9781 11.4957 3.0875C11.6051 3.19689 11.6666 3.34527 11.6666 3.49998V7.58331Z"
                          stroke="#9810FA"
                          strokeWidth="1.16667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_965_93305">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </div>

                {/* Display user's role in this tenant */}
                <div className="flex w-full items-center pl-[14px]">
                  <span className="font-inter text-slate-500 dark:text-slate-400 text-[10px] leading-[14px]">
                    as {userTenant.role.name}
                  </span>
                  {isCurrentTenant && (
                    <div className="border-black/15 ml-auto flex h-[19.087px] items-center justify-center gap-[3.5px] rounded-[5.25px] border px-[7px] py-[1.75px] dark:border-white/15">
                      <span className="font-inter text-slate-800 dark:text-slate-200 text-[10.5px] font-medium leading-[14px]">
                        Current
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
