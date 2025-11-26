'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, UserPlus, Edit, Trash2, ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { usersData } from '../data/dummy-data';

export default function UsersTab() {
  return (
    <Card className="flex flex-col gap-5 self-stretch rounded-[20px] bg-white p-[30px]">
      {/* Header */}
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold leading-8 tracking-[-0.48px] text-[#2B3674]">
              Internal User (29)
            </h2>
            <p className="text-xs font-normal leading-4 tracking-[0.4px] text-[#2B3674]">
              Daftar pengguna di dalam tenant
            </p>
          </div>
          <Button className="h-12 gap-1 rounded-[10px] bg-[#08F] px-3">
            <UserPlus className="h-6 w-6" />
            Invite User
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-5 rounded-[10px] bg-[#F4F7FE] p-[10px]">
          <div className="flex h-[54px] items-center gap-1 rounded-[10px] border border-[#D9D9D9] bg-white px-[5px]">
            <div className="flex items-center gap-1 px-[10px] py-[6px]">
              <span className="text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">20</span>
              <ChevronDown className="h-6 w-6 text-[#332687]" />
            </div>
          </div>
          <div className="flex h-[54px] flex-1 items-center gap-[15px] rounded-[10px] border border-[#D9D9D9] bg-white px-5">
            <Search className="h-5 w-5 text-[#332687]" />
            <Input
              placeholder="Cari nama user"
              className="h-auto border-0 p-0 text-base font-normal leading-5 tracking-[-0.32px] text-[#8F9BBA] placeholder:text-[#8F9BBA] focus-visible:ring-0"
            />
          </div>
          <div className="flex h-[54px] items-center gap-[10px]">
            <Button variant="outline" className="h-full gap-1 rounded-[10px] border border-[#D9D9D9] bg-white px-3">
              <span className="text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">All Status</span>
              <ChevronDown className="h-6 w-6 text-[#332687]" />
            </Button>
            <Button variant="outline" className="h-full gap-1 rounded-[10px] border border-[#D9D9D9] bg-white px-3">
              <span className="text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">All Type</span>
              <ChevronDown className="h-6 w-6 text-[#332687]" />
            </Button>
            <Button variant="outline" className="h-full gap-1 rounded-[10px] border border-[#D9D9D9] bg-[#F9FAFB] px-3">
              <Filter className="h-[18px] w-[18px] text-[#332687]" />
              <span className="text-sm font-medium leading-5 tracking-[0.1px] text-[#49454F]">Filter</span>
            </Button>
            <Button variant="outline" className="h-[54px] w-[54px] rounded-[10px] bg-[#F4F7FE] p-0">
              <svg className="h-[35px] w-[35px]" viewBox="0 0 35 35" fill="none">
                <path d="M8.75681 14.5947C7.1514 14.5947 5.83789 15.9082 5.83789 17.5136C5.83789 19.1191 7.1514 20.4326 8.75681 20.4326C10.3622 20.4326 11.6757 19.1191 11.6757 17.5136C11.6757 15.9082 10.3622 14.5947 8.75681 14.5947ZM26.2703 14.5947C24.6649 14.5947 23.3514 15.9082 23.3514 17.5136C23.3514 19.1191 24.6649 20.4326 26.2703 20.4326C27.8757 20.4326 29.1892 19.1191 29.1892 17.5136C29.1892 15.9082 27.8757 14.5947 26.2703 14.5947ZM17.5136 14.5947C15.9082 14.5947 14.5946 15.9082 14.5946 17.5136C14.5946 19.1191 15.9082 20.4326 17.5136 20.4326C19.119 20.4326 20.4325 19.1191 20.4325 17.5136C20.4325 15.9082 19.119 14.5947 17.5136 14.5947Z" fill="#4318FF"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-[10px]">
        {/* Table Header */}
        <div className="flex items-center justify-between self-stretch">
          <div className="flex w-[150px] items-center gap-[10px]">
            <Checkbox />
            <span className="text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">Nama</span>
            <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
          </div>
          <div className="flex w-[120px] items-center gap-[7px]">
            <span className="text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">Email</span>
            <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
          </div>
          <div className="flex w-[120px] items-center gap-[7px]">
            <span className="text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">Status</span>
            <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
          </div>
          <div className="flex w-[120px] items-center gap-[7px]">
            <span className="text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">Role</span>
            <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
          </div>
          <div className="flex w-[120px] items-center gap-[7px]">
            <span className="text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">Last Login</span>
            <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
          </div>
          <div className="flex w-[210px] items-center gap-[7px]">
            <span className="text-sm font-medium leading-6 tracking-[-0.28px] text-[#A3AED0]">Action</span>
            <ChevronDown className="h-6 w-6 text-[#A3AED0]" />
          </div>
        </div>

        <div className="h-px w-full bg-[#E9EDF7]"></div>

        {/* Table Rows */}
        {usersData.map((user) => (
          <div key={user.id} className="flex items-center justify-between self-stretch">
            <div className="flex w-[150px] items-center gap-[10px]">
              <Checkbox checked />
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4F46E5] p-[10px]">
                <span className="text-center font-dm text-base font-normal leading-[30px] tracking-[-0.32px] text-white">
                  KR
                </span>
              </div>
              <span className="w-[120px] text-sm font-medium leading-[14px] text-[#404040]">
                {user.name}
              </span>
            </div>
            <div className="w-[120px]">
              <p className="font-dm text-xs font-normal leading-[15px] tracking-[-0.24px] text-[#2B3674]">
                {user.email}
              </p>
            </div>
            <div className="w-[120px]">
              <Badge className={`rounded-[5px] px-[10px] py-0 font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674] ${
                user.status === 'Active' 
                  ? 'bg-[rgba(103,80,164,0.08)] hover:bg-[rgba(103,80,164,0.08)]' 
                  : 'bg-[rgba(255,251,235,1)] hover:bg-[rgba(255,251,235,1)]'
              }`}>
                {user.status}
              </Badge>
            </div>
            <div className="w-[120px]">
              <Badge className="rounded-[5px] bg-[rgba(103,80,164,0.08)] px-[10px] py-0 font-dm text-sm font-bold leading-6 tracking-[-0.28px] text-[#2B3674] hover:bg-[rgba(103,80,164,0.08)]">
                {user.role}
              </Badge>
            </div>
            <div className="w-[120px]">
              <p className="font-dm text-xs font-normal leading-[15px] tracking-[-0.24px] text-[#2B3674]">
                {user.lastLogin}
              </p>
            </div>
            <div className="flex w-[210px] items-center gap-5 self-stretch">
              <Edit className="h-[25px] w-[25px] text-[#6750A4]" />
              <Trash2 className="h-[30px] w-[30px] text-[#BF6A02]" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
