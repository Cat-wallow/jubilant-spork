'use client';

interface ProjectScope {
  title: string;
  titleColor: string;
  bgColor: string;
  items: string[];
}

interface ProgressSummary {
  title: string;
  titleColor: string;
  bgColor: string;
  percentage: number;
  summary: string;
  summaryColor: string;
}

interface UserRole {
  title: string;
  titleColor: string;
  bgColor: string;
  role: string;
  roleColor: string;
  permission: string;
  permissionColor: string;
}

interface OverviewData {
  title: string;
  description: string;
  projectScope: ProjectScope;
  progressSummary: ProgressSummary;
  userRole: UserRole;
}

interface OverviewSectionProps {
  data: OverviewData;
}

export function OverviewSection({ data }: OverviewSectionProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-base font-normal text-gray-900">{data.title}</h2>
        <p className="mt-1 text-sm text-gray-600">{data.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Project Scope */}
        <div className={`rounded-xl ${data.projectScope.bgColor} p-4`}>
          <h3 className={`text-base font-normal ${data.projectScope.titleColor} mb-4`}>
            {data.projectScope.title}
          </h3>
          <ul className="space-y-2">
            {data.projectScope.items.map((item, index) => (
              <li key={index} className="text-sm font-normal text-blue-600">
                ✓ {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Summary */}
        <div className={`rounded-xl ${data.progressSummary.bgColor} p-4`}>
          <h3 className={`text-base font-normal ${data.progressSummary.titleColor} mb-4`}>
            {data.progressSummary.title}
          </h3>
          <div className="text-3xl font-bold text-gray-900">{data.progressSummary.percentage}%</div>
          <p className={`mt-2 text-sm font-normal ${data.progressSummary.summaryColor}`}>
            {data.progressSummary.summary}
          </p>
        </div>

        {/* User Role */}
        <div className={`rounded-xl ${data.userRole.bgColor} p-4`}>
          <h3 className={`text-base font-normal ${data.userRole.titleColor} mb-4`}>
            {data.userRole.title}
          </h3>
          <p className={`text-base font-normal ${data.userRole.roleColor}`}>{data.userRole.role}</p>
          <p className={`mt-2 text-sm font-normal ${data.userRole.permissionColor}`}>
            {data.userRole.permission}
          </p>
        </div>
      </div>
    </div>
  );
}
