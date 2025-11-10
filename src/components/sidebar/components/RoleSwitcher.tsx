'use client';

import { useState, useRef, useEffect } from 'react';

interface Role {
  id: string;
  name: string;
  color: string;
  isCurrent?: boolean;
}

const roles: Role[] = [
  {
    id: 'admin',
    name: 'Admin Platform',
    color: 'linear-gradient(90deg, #AD46FF 0%, #615FFF 100%)',
    isCurrent: true,
  },
  { id: 'executive', name: 'Executive', color: '#AD46FF' },
  { id: 'pmo', name: 'PMO', color: '#2B7FFF' },
  { id: 'ketua-tim', name: 'Ketua Tim', color: '#00C950' },
  { id: 'anggota-tim', name: 'Anggota Tim', color: '#F0B100' },
  { id: 'wp-admin', name: 'WP Admin', color: '#FF6900' },
  { id: 'wp-viewer', name: 'WP Viewer', color: '#6A7282' },
];

export default function RoleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(
    roles.find((r) => r.isCurrent) || roles[0],
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setIsOpen(false);
    // TODO: Implement role switching logic
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-2.5 rounded-[5px] bg-[#EDECFC] px-[5px] transition-colors hover:bg-[#d8d5f7] dark:bg-navy-700 dark:hover:bg-navy-600"
      >
        <span className="font-dm text-xs font-normal leading-[24px] tracking-[-0.24px] text-[#7887EE] dark:text-purple-300">
          {selectedRole.name}
        </span>
      </button>

      {isOpen && (
        <div className="border-black/15 absolute left-0 top-full z-50 mt-2 flex w-[196px] flex-col gap-px rounded-[5.25px] border bg-white p-1 shadow-[0_4px_6px_4px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.10)] dark:border-white/15 dark:bg-navy-800">
          <div className="flex h-[24.488px] items-start px-[7px] py-[5.25px]">
            <span className="font-inter text-slate-500 dark:text-slate-400 flex-1 text-[10.5px] font-bold leading-[14px]">
              Switch Role
            </span>
          </div>

          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role)}
              className={`flex h-auto min-h-[28px] items-center gap-1 rounded-[3.5px] px-[7px] py-2 transition-colors hover:bg-blue-50 dark:hover:bg-navy-700 ${
                role.isCurrent ? 'bg-blue-50 dark:bg-navy-700' : ''
              }`}
            >
              <div className="flex flex-1 items-center gap-[7px]">
                <div
                  className="h-[7px] w-[7px] flex-shrink-0 rounded-full"
                  style={{ background: role.color }}
                />
                <span className="font-inter text-slate-800 dark:text-slate-200 flex-1 text-xs font-normal leading-[17.5px]">
                  {role.name}
                </span>
              </div>

              {role.isCurrent && (
                <div className="flex items-center gap-1">
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
                  <div className="border-black/15 flex h-[19.087px] w-[51.425px] items-center justify-center gap-[3.5px] rounded-[5.25px] border px-[7px] py-[1.75px] dark:border-white/15">
                    <span className="font-inter text-slate-800 dark:text-slate-200 text-[10.5px] font-medium leading-[14px]">
                      Current
                    </span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
