import { JournalDetailHeader } from './components/JournalDetailHeader';
import { JournalInformation } from './components/JournalInformation';
import { BalanceSummary } from './components/BalanceSummary';
import { JournalEntriesTable } from './components/JournalEntriesTable';
import { DetailTabs } from './components/DetailTabs';
import { journalDetailData, journalStatsData } from '../mock-data';

export default function JournalDetailPage() {
  return (
    <div className="flex flex-col items-start gap-[30px] self-stretch">
      {/* Header with breadcrumb and title */}
      <JournalDetailHeader data={journalDetailData} />

      {/* Stats Cards */}
      <div className="flex items-start gap-[30px] self-stretch">
        <div className="flex h-[97px] flex-1 items-center gap-[18px] rounded-[20px] border border-[rgba(145,158,171,0.20)] px-4 shadow-[0_2px_2px_0_rgba(0,0,0,0.10)]">
          <div className="flex h-14 w-14 items-center justify-center gap-2.5 rounded-[28px]">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.1562 9.14062V7.73438C20.1562 7.60547 20.0508 7.5 19.9219 7.5H8.67188C8.54297 7.5 8.4375 7.60547 8.4375 7.73438V9.14062C8.4375 9.26953 8.54297 9.375 8.67188 9.375H19.9219C20.0508 9.375 20.1562 9.26953 20.1562 9.14062ZM8.67188 11.7188C8.54297 11.7188 8.4375 11.8242 8.4375 11.9531V13.3594C8.4375 13.4883 8.54297 13.5938 8.67188 13.5938H14.0625C14.1914 13.5938 14.2969 13.4883 14.2969 13.3594V11.9531C14.2969 11.8242 14.1914 11.7188 14.0625 11.7188H8.67188ZM19.6875 15.1172C16.1924 15.1172 13.3594 17.9502 13.3594 21.4453C13.3594 24.9404 16.1924 27.7734 19.6875 27.7734C23.1826 27.7734 26.0156 24.9404 26.0156 21.4453C26.0156 17.9502 23.1826 15.1172 19.6875 15.1172Z"
                fill="#332687"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-bold leading-6 tracking-[-0.28px] text-[#A3AED0]">
              Voucher Recorded
            </div>
            <div className="text-2xl font-bold leading-8 tracking-[-0.48px] text-[#404040]">20</div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold leading-5 tracking-[-0.24px] text-[#05CD99]">/30</span>
              <span className="text-xs font-normal leading-5 tracking-[-0.24px] text-[#A3AED0]">
                Draft
              </span>
            </div>
          </div>
        </div>
        {/* Add similar cards for other stats... */}
      </div>

      {/* Main Content */}
      <div className="flex items-center gap-[30px] self-stretch">
        {/* Left Side - Journal Information */}
        <JournalInformation data={journalDetailData} />

        {/* Right Side - Balance Summary */}
        <BalanceSummary data={journalDetailData} />
      </div>

      {/* Journal Entries Table */}
      <JournalEntriesTable entries={journalDetailData.entries} />

      {/* Additional Details Tabs */}
      <DetailTabs data={journalDetailData} />
    </div>
  );
}
