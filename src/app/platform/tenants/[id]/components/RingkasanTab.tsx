import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tenant } from '@/types/tenant';
import { Users, Briefcase } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

interface RingkasanTabProps {
  tenant: Tenant;
}

const InfoItem = ({ label, value }: { label: string; value: string | undefined | null }) => (
  <div className="flex flex-1 flex-col">
    <label className="text-sm ">{label}</label>
    <div className="h-[45px]">
      <p className="pt-2 ">{value || '-'}</p>
    </div>
  </div>
);

const StatsCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) => (
  <Card className="flex h-[103px] flex-1 flex-col justify-center gap-2 p-6">
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg ">
        {icon}
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sm ">{label}</p>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl ">{value}</p>
        </div>
      </div>
    </div>
    <Progress value={(value) * 100} className="h-2" />
  </Card>
);

export default function RingkasanTab({ tenant }: RingkasanTabProps) {
  const { settings, pic, slug, status, created_at, plan, stats } = tenant;

  const metrics = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      label: 'Users',
      value: stats.users.current,
    },
    {
      icon: <Briefcase className="h-6 w-6 text-green-600" />,
      label: 'Projects',
      value: stats.projects.current,
    },
  ];

  return (
    <div className="flex flex-col gap-[30px]">
      {/* Company Information Card */}
      <Card className="flex flex-col gap-5 self-stretch rounded-[20px] p-5">
        <h2 className="text-[22px] font-medium leading-7 text-primary">
          Ringkasan Informasi Perusahaan
        </h2>

        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-wrap gap-5 self-stretch">
            <InfoItem label="Nama Perusahaan" value={settings?.companyName} />
            <InfoItem label="PIC" value={pic?.name} />
          </div>
          <div className="flex flex-wrap gap-5 self-stretch">
            <InfoItem label="Slug" value={slug} />
            <InfoItem label="PIC Email" value={pic?.email} />
          </div>
          <div className="flex flex-wrap gap-5 self-stretch">
            <div className="flex flex-1 flex-col">
              <label className="text-sm ">Status</label>
              <div className="h-[45px] pt-2">
                <Badge variant={status === 'active' ? 'default' : 'destructive'}>{status}</Badge>
              </div>
            </div>
            <InfoItem
              label="Created At"
              value={new Date(created_at).toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            />
          </div>
        </div>
      </Card>

      {/* Metrics Cards */}
      <div className="flex items-center gap-[30px] self-stretch">
        {metrics.map((metric, index) => (
          <StatsCard key={index} {...metric} />
        ))}
      </div>

      {/* Branding Settings Card */}
      <Card className="flex flex-col items-start gap-6 self-stretch rounded-[10.5px] border p-6">
        <h2 className="self-stretch text-[22px] font-medium text-primary leading-7">
          Branding Settings
        </h2>
        <div className="flex w-full items-start justify-between self-stretch">
          <div className="flex flex-1 flex-col items-start gap-4">
            <div className="flex flex-wrap gap-5 self-stretch">
              <InfoItem label="Company Name" value={settings?.companyName} />
            </div>
            <div className="flex flex-wrap gap-5 self-stretch">
              <InfoItem label="PIC" value={settings?.tagline || '-'} />
            </div>
          </div>
          <div className="flex flex-1 flex-col items-start gap-2">
            <label className=" font-medium">Logo</label>
            <div className="flex h-30 items-center justify-start rounded-lg border bg-gray-50 p-2">
              {tenant.logo_url ? (
                <Image
                  src={tenant.logo_url}
                  onClick={() => {
                    window.open(tenant.logo_url, '_blank');
                  }}
                  width={30}
                  height={30}
                  alt="Tenant Logo"
                  className="h-full cursor-pointer max-h-20 w-auto object-contain"
                />
              ) : (
                <p className="text-sm text-gray-400">No logo uploaded</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
