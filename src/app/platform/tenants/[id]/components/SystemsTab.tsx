import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Clock } from 'lucide-react';
import {
  systemsBillingData,
  systemsAuditTrailData,
  systemsUsageData,
  systemsBrandingData,
  systemsIntegrationsData,
  systemsAvailableIntegrationsData,
} from '../data/dummy-data';

export default function SystemsTab() {
  return (
    <div className="flex flex-col gap-[30px]">
      {/* Billing Information & Audit Trail */}
      <div className="flex items-start gap-[30px] self-stretch">
        {/* Billing Information Card */}
        <Card className="flex flex-1 flex-col items-start gap-[26.25px] rounded-[10.5px] border border-black/15 bg-white p-6">
          <h2 className="self-stretch text-[22px] font-medium leading-7 text-[#2B3674]">
            Billing Information
          </h2>
          <div className="flex items-center gap-[21px] self-stretch">
            {/* Left Column */}
            <div className="flex flex-1 flex-col items-start gap-[14px]">
              <div className="flex flex-col items-start gap-[7.55px] self-stretch">
                <label className="text-xs font-medium leading-[17.5px] text-[#64748B]">
                  Current Plan
                </label>
                <Badge className="rounded-[5.25px] border-0 bg-[#DBEAFE] px-[7px] py-[1.55px] text-[10.5px] font-medium leading-[14px] text-[#193CB8] hover:bg-[#DBEAFE]">
                  {systemsBillingData.currentPlan}
                </Badge>
              </div>
              <div className="flex flex-col items-start gap-[1.8px] self-stretch">
                <label className="text-xs font-medium leading-[17.5px] text-[#64748B]">
                  Billing Cycle
                </label>
                <p className="text-sm font-medium leading-[21px] text-[#1E293B]">
                  {systemsBillingData.billingCycle}
                </p>
              </div>
              <div className="flex flex-col items-start gap-[1.8px] self-stretch">
                <label className="text-xs font-medium leading-[17.5px] text-[#64748B]">
                  Amount
                </label>
                <p className="text-sm font-medium leading-[21px] text-[#1E293B]">
                  {systemsBillingData.amount}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-1 flex-col items-start gap-[14px]">
              <div className="flex flex-col items-start gap-[1.8px] self-stretch">
                <label className="text-xs font-medium leading-[17.5px] text-[#64748B]">
                  Next Billing Date
                </label>
                <p className="text-sm font-medium leading-[21px] text-[#1E293B]">
                  {systemsBillingData.nextBillingDate}
                </p>
              </div>
              <div className="flex flex-col items-start gap-[1.8px] self-stretch">
                <label className="text-xs font-medium leading-[17.5px] text-[#64748B]">
                  Payment Method
                </label>
                <p className="text-sm font-medium leading-[21px] text-[#1E293B]">
                  {systemsBillingData.paymentMethod}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Audit Trail Card */}
        <Card className="flex flex-1 flex-col items-start gap-[26.25px] self-stretch rounded-[10.5px] border border-black/15 bg-white p-6">
          <h2 className="self-stretch text-[22px] font-medium leading-7 text-[#2B3674]">
            Audit Trail
          </h2>
          <div className="flex flex-col items-start self-stretch">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-black/15">
                  <TableHead className="px-[7px] py-[7.55px] text-xs font-medium leading-[17.5px] text-[#1E293B]">
                    Action
                  </TableHead>
                  <TableHead className="px-[7px] py-[7.55px] text-xs font-medium leading-[17.5px] text-[#1E293B]">
                    Performed By
                  </TableHead>
                  <TableHead className="px-[7px] py-[7.55px] text-xs font-medium leading-[17.5px] text-[#1E293B]">
                    Timestamp
                  </TableHead>
                  <TableHead className="px-[7px] py-[7.55px] text-xs font-medium leading-[17.5px] text-[#1E293B]">
                    Severity
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemsAuditTrailData.map((audit, index) => (
                  <TableRow
                    key={index}
                    className={index < systemsAuditTrailData.length - 1 ? 'border-b border-black/15' : ''}
                  >
                    <TableCell className="px-[7px] py-[7.188px] text-xs font-medium leading-[17.5px] text-[#1E293B]">
                      {audit.action}
                    </TableCell>
                    <TableCell className="px-[7px] py-[7.188px] text-xs font-normal leading-[17.5px] text-[#1E293B]">
                      {audit.performedBy}
                    </TableCell>
                    <TableCell className="px-[7px] py-[7.188px] text-xs font-normal leading-[17.5px] text-[#1E293B]">
                      {audit.timestamp}
                    </TableCell>
                    <TableCell className="px-[7px] py-[7.4px]">
                      <Badge className="rounded-[5.25px] border-0 bg-[#F1F5F9] px-[7px] py-[1.55px] text-[10.5px] font-medium leading-[14px] text-[#64748B] hover:bg-[#F1F5F9]">
                        {audit.severity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Users, API Calls, Storage Cards */}
      <div className="flex items-center gap-[30px] self-stretch">
        {/* Users Card */}
        <Card className="flex flex-1 flex-col items-start gap-[26.25px] rounded-[10.5px] border border-black/15 bg-white p-6">
          <h2 className="self-stretch text-[22px] font-medium leading-7 text-[#2B3674]">Users</h2>
          <div className="flex flex-col items-start gap-[7px] self-stretch">
            <div className="flex h-[21px] items-start justify-between self-stretch">
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">Active</p>
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">
                {systemsUsageData.users.active}
              </p>
            </div>
            <div className="flex h-[21px] items-start justify-between self-stretch">
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">Limit</p>
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">
                {systemsUsageData.users.limit}
              </p>
            </div>
            <div className="flex h-[7px] flex-col items-start self-stretch overflow-hidden rounded-full bg-[rgba(79,70,229,0.2)]">
              <div
                className="h-[7px] flex-shrink-0 self-stretch bg-[#4F46E5]"
                style={{ width: `${systemsUsageData.users.percentage}%` }}
              ></div>
            </div>
          </div>
        </Card>

        {/* API Calls Card */}
        <Card className="flex flex-1 flex-col items-start gap-[26.25px] rounded-[10.5px] border border-black/15 bg-white p-6">
          <h2 className="self-stretch text-[22px] font-medium leading-7 text-[#2B3674]">
            API Calls
          </h2>
          <div className="flex flex-col items-start gap-[7px] self-stretch">
            <div className="flex h-[21px] items-start justify-between self-stretch">
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">This Month</p>
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">
                {systemsUsageData.apiCalls.thisMonth.toLocaleString()}
              </p>
            </div>
            <div className="flex h-[21px] items-start justify-between self-stretch">
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">Limit</p>
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">
                {systemsUsageData.apiCalls.limit.toLocaleString()}
              </p>
            </div>
            <div className="flex h-[7px] flex-col items-start self-stretch overflow-hidden rounded-full bg-[rgba(79,70,229,0.2)]">
              <div
                className="h-[7px] flex-shrink-0 self-stretch bg-[#4F46E5]"
                style={{ width: `${systemsUsageData.apiCalls.percentage}%` }}
              ></div>
            </div>
          </div>
        </Card>

        {/* Storage Card */}
        <Card className="flex flex-1 flex-col items-start gap-[26.25px] rounded-[10.5px] border border-black/15 bg-white p-6">
          <h2 className="self-stretch text-[22px] font-medium leading-7 text-[#2B3674]">Storage</h2>
          <div className="flex flex-col items-start gap-[7px] self-stretch">
            <div className="flex h-[21px] items-start justify-between self-stretch">
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">Used</p>
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">
                {systemsUsageData.storage.used}
              </p>
            </div>
            <div className="flex h-[21px] items-start justify-between self-stretch">
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">Limit</p>
              <p className="text-sm font-normal leading-[21px] text-[#1E293B]">
                {systemsUsageData.storage.limit}
              </p>
            </div>
            <div className="flex h-[7px] flex-col items-start self-stretch overflow-hidden rounded-full bg-[rgba(79,70,229,0.2)]">
              <div
                className="h-[7px] flex-shrink-0 self-stretch bg-[#4F46E5]"
                style={{ width: `${systemsUsageData.storage.percentage}%` }}
              ></div>
            </div>
          </div>
        </Card>
      </div>

      {/* Branding Settings Card */}
      <Card className="flex flex-col items-start gap-[26.25px] self-stretch rounded-[10.5px] border border-black/15 bg-white p-6">
        <h2 className="self-stretch text-[22px] font-medium leading-7 text-[#2B3674]">
          Branding Settings
        </h2>
        <div className="flex items-center justify-between self-stretch">
          {/* Left Column */}
          <div className="flex h-[154px] flex-1 flex-col items-start gap-[14px]">
            <div className="flex flex-col items-start gap-[1.8px] self-stretch">
              <label className="text-xs font-medium leading-[17.5px] text-[#64748B]">
                Company Name
              </label>
              <p className="text-sm font-medium leading-[21px] text-[#1E293B]">
                {systemsBrandingData.companyName}
              </p>
            </div>
            <div className="flex flex-col items-start gap-[1.8px] self-stretch">
              <label className="text-xs font-medium leading-[17.5px] text-[#64748B]">Tagline</label>
              <p className="text-sm font-medium leading-[21px] text-[#1E293B]">
                {systemsBrandingData.tagline}
              </p>
            </div>
            <div className="flex flex-col items-start gap-[1.8px] self-stretch">
              <label className="text-xs font-medium leading-[17.5px] text-[#64748B]">
                Primary Color
              </label>
              <div className="flex h-[21px] items-center gap-[7px]">
                <div
                  className="h-[21px] w-[21px] rounded-[3.5px] border border-black/15"
                  style={{ backgroundColor: systemsBrandingData.primaryColor }}
                ></div>
                <p className="text-xs font-normal leading-[17.5px] text-[#1E293B]">
                  {systemsBrandingData.primaryColor}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Logo */}
          <div className="flex flex-1 flex-col items-start gap-[8.8px]">
            <label className="text-xs font-medium leading-[17.5px] text-[#64748B]">Logo</label>
            <div className="flex h-[51px] flex-col items-start self-stretch rounded-[7px] border border-black/15 px-[14.8px] py-[14.8px]">
              <div className="h-[21px] self-stretch"></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Integrations Card */}
      <Card className="flex flex-col items-start gap-[26.25px] self-stretch rounded-[10.5px] border border-black/15 bg-white p-6">
        <h2 className="self-stretch text-[22px] font-medium leading-7 text-[#2B3674]">
          Integrations
        </h2>
        <div className="flex flex-col items-start gap-[14px] self-stretch">
          {systemsIntegrationsData.map((integration, index) => (
            <div
              key={index}
              className="flex items-center justify-between self-stretch rounded-[7px] border border-black/15 px-[14px] py-0"
            >
              <div className="flex h-[89.088px] items-center gap-[14px]">
                <div className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[7px]">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 19.25V14.875"
                      stroke="white"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.875 7V1.75"
                      stroke="white"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.125 7V1.75"
                      stroke="white"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.75 7V11.375C15.75 12.3033 15.3813 13.1935 14.7249 13.8499C14.0685 14.5063 13.1783 14.875 12.25 14.875H8.75C7.82174 14.875 6.9315 14.5063 6.27513 13.8499C5.61875 13.1935 5.25 12.3033 5.25 11.375V7H15.75Z"
                      stroke="white"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex flex-1 flex-col items-start gap-[3.5px]">
                  <div className="flex h-[21px] flex-shrink-0 items-center gap-[10px] self-stretch">
                    <h4 className="text-sm font-semibold leading-[21px] text-[#1E293B]">
                      {integration.name}
                    </h4>
                    <Badge className="rounded-[5.25px] border border-black/15 bg-transparent px-[7px] py-[1.75px] text-[10.5px] font-medium leading-[14px] text-[#1E293B] hover:bg-transparent">
                      {integration.category}
                    </Badge>
                  </div>
                  <p className="flex-shrink-0 self-stretch text-xs font-normal leading-[17.5px] text-[#64748B]">
                    {integration.description}
                  </p>
                  {integration.lastSync && (
                    <div className="flex items-end gap-[3.5px] self-stretch">
                      <Clock className="h-[11px] w-[11px] text-[#64748B]" />
                      <p className="text-[10.5px] font-normal leading-[14px] text-[#64748B]">
                        Last sync: {integration.lastSync}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex h-[28px] items-center gap-[10.5px]">
                {integration.status === 'connected' ? (
                  <>
                    <Badge className="rounded-[5.25px] border-0 bg-[#DCFCE7] px-[7px] py-[1.75px] text-[10.5px] font-medium leading-[14px] text-[#016630] hover:bg-[#DCFCE7]">
                      Connected
                    </Badge>
                    <Button
                      variant="outline"
                      className="h-[28px] flex-shrink-0 rounded-[5.25px] border border-black/15 bg-[#F8FAFC] px-[10.5px] text-xs font-medium leading-[17.5px] text-[#1E293B]"
                    >
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <>
                    <Badge className="rounded-[5.25px] border-0 bg-[#FFE2E2] px-[7px] py-[1.75px] text-[10.5px] font-medium leading-[14px] text-[#9F0712] hover:bg-[#FFE2E2]">
                      Disconnected
                    </Badge>
                    <Button className="h-[28px] flex-shrink-0 rounded-[5.25px] bg-[#4F46E5] px-[10.5px] text-xs font-medium leading-[17.5px] text-white hover:bg-[#4338ca]">
                      Connect
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Available Integrations Card */}
      <Card className="flex flex-col items-start gap-[26.25px] self-stretch rounded-[10.5px] border border-black/15 bg-white p-6">
        <h2 className="self-stretch text-[22px] font-medium leading-7 text-[#2B3674]">
          Available Integrations
        </h2>
        <div className="flex flex-col items-start gap-[20px] self-stretch">
          {/* First Row */}
          <div className="flex items-center gap-[20px] self-stretch">
            {systemsAvailableIntegrationsData.slice(0, 3).map((integration, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-start rounded-[7px] border border-black/15 px-[14.8px] py-[14.8px]"
              >
                <div className="flex h-[80.5px] flex-shrink-0 flex-col items-start gap-[7px] self-stretch">
                  <div className="flex h-[21px] flex-shrink-0 items-center justify-between self-stretch">
                    <h5 className="text-sm font-medium leading-[21px] text-[#1E293B]">
                      {integration.name}
                    </h5>
                    <Badge className="rounded-[5.25px] border-0 bg-[#F1F5F9] px-[7px] py-[1.75px] text-[10.5px] font-medium leading-[14px] text-[#64748B] hover:bg-[#F1F5F9]">
                      {integration.category}
                    </Badge>
                  </div>
                  <p className="flex-1 flex-shrink-0 self-stretch text-xs font-normal leading-[17.5px] text-[#64748B]">
                    {integration.description}
                  </p>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-[12px] self-stretch rounded-[5.25px] border border-black/15 bg-[#F8FAFC] px-[113px] py-[4px]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 12.8337V9.91699"
                        stroke="#1E293B"
                        strokeWidth="1.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.25 4.66699V1.16699"
                        stroke="#1E293B"
                        strokeWidth="1.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.75 4.66699V1.16699"
                        stroke="#1E293B"
                        strokeWidth="1.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 4.66699V7.58366C10.5 8.2025 10.2542 8.79599 9.81658 9.23357C9.379 9.67116 8.7855 9.91699 8.16667 9.91699H5.83333C5.21449 9.91699 4.621 9.67116 4.18342 9.23357C3.74583 8.79599 3.5 8.2025 3.5 7.58366V4.66699H10.5Z"
                        stroke="#1E293B"
                        strokeWidth="1.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-xs font-medium leading-[17.5px] text-[#1E293B]">
                      Setup Integration
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex items-center gap-[20px] self-stretch">
            {systemsAvailableIntegrationsData.slice(3, 6).map((integration, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-start rounded-[7px] border border-black/15 px-[14.8px] py-[14.8px]"
              >
                <div className="flex h-[80.5px] flex-shrink-0 flex-col items-start gap-[7px] self-stretch">
                  <div className="flex h-[21px] flex-shrink-0 items-center justify-between self-stretch">
                    <h5 className="text-sm font-medium leading-[21px] text-[#1E293B]">
                      {integration.name}
                    </h5>
                    <Badge className="rounded-[5.25px] border-0 bg-[#F1F5F9] px-[7px] py-[1.75px] text-[10.5px] font-medium leading-[14px] text-[#64748B] hover:bg-[#F1F5F9]">
                      {integration.category}
                    </Badge>
                  </div>
                  <p className="flex-1 flex-shrink-0 self-stretch text-xs font-normal leading-[17.5px] text-[#64748B]">
                    {integration.description}
                  </p>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-[12px] self-stretch rounded-[5.25px] border border-black/15 bg-[#F8FAFC] px-[113px] py-[4px]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 12.8337V9.91699"
                        stroke="#1E293B"
                        strokeWidth="1.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.25 4.66699V1.16699"
                        stroke="#1E293B"
                        strokeWidth="1.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.75 4.66699V1.16699"
                        stroke="#1E293B"
                        strokeWidth="1.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 4.66699V7.58366C10.5 8.2025 10.2542 8.79599 9.81658 9.23357C9.379 9.67116 8.7855 9.91699 8.16667 9.91699H5.83333C5.21449 9.91699 4.621 9.67116 4.18342 9.23357C3.74583 8.79599 3.5 8.2025 3.5 7.58366V4.66699H10.5Z"
                        stroke="#1E293B"
                        strokeWidth="1.16667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-xs font-medium leading-[17.5px] text-[#1E293B]">
                      Setup Integration
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
