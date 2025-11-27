'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, UserPlus, Edit, Trash2, ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { usersData } from '../data/dummy-data';
import UserTable from '@/app/tenant/users/components/UserTable';

export default function UsersTab({tenantId} : {tenantId: string}) {
  return (
    <UserTable tenantid={tenantId}/>
  );
}
