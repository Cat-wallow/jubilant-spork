import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, FileCheck, Users, Building2 } from 'lucide-react';
import { JournalDetail } from '../../mock-data';

interface JournalInformationProps {
  data: JournalDetail;
}

export function JournalInformation({ data }: JournalInformationProps) {
  return (
    <Card className="flex flex-1 flex-col items-start gap-5 self-stretch rounded-[14px] border-[0.8px] border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(0,0,0,0.10),_0_1px_2px_-1px_rgba(0,0,0,0.10)]">
      <CardHeader className="flex items-center self-stretch border-b-[0.8px] border-[#E2E8F0]">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#155DFC]" />
          <span className="text-base font-normal leading-4 text-[#0F172B]">
            Journal Information
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex items-center gap-6 self-stretch">
        {/* Left Column */}
        <div className="flex flex-1 flex-col items-start gap-5">
          <div className="flex items-center gap-3 self-stretch">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M3.33398 7.5H16.6673M3.33398 12.5H16.6673M8.33268 2.5L6.66602 17.5M13.3327 2.5L11.666 17.5"
                stroke="#62748E"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col items-start">
              <div className="text-sm font-normal leading-5 text-[#62748E]">
                Journal Number
              </div>
              <div className="font-mono text-base font-bold leading-6 text-[#0F172B]">
                {data.number}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch">
            <Calendar className="h-5 w-5 text-[#62748E]" />
            <div className="flex flex-col items-start">
              <div className="text-sm font-normal leading-5 text-[#62748E]">
                Transaction Date
              </div>
              <div className="text-base font-bold leading-6 text-[#0F172B]">{data.date}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch">
            <FileCheck className="h-5 w-5 text-[#62748E]" />
            <div className="flex flex-col items-start">
              <div className="text-sm font-normal leading-5 text-[#62748E]">Description</div>
              <div className="text-base font-normal leading-6 text-[#0F172B]">
                {data.description}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-1 flex-col items-start gap-5">
          <div className="flex items-center gap-3 self-stretch">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M16.6673 10.8331C16.6673 14.9997 13.7507 17.0831 10.284 18.2914C10.1025 18.3529 9.90527 18.35 9.72565 18.2831C6.25065 17.0831 3.33398 14.9997 3.33398 10.8331V4.99972C3.33398 4.77871 3.42178 4.56675 3.57806 4.41047C3.73434 4.25419 3.9463 4.16639 4.16732 4.16639C5.83398 4.16639 7.91732 3.16639 9.36732 1.89972C9.54386 1.74889 9.76845 1.66602 10.0007 1.66602C10.2329 1.66602 10.4574 1.74889 10.634 1.89972C12.0923 3.17472 14.1673 4.16639 15.834 4.16639C16.055 4.16639 16.267 4.25419 16.4232 4.41047C16.5795 4.56675 16.6673 4.77871 16.6673 4.99972V10.8331Z"
                stroke="#62748E"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col items-start gap-[1.613px]">
              <div className="text-sm font-normal leading-5 text-[#62748E]">Status</div>
              <Badge className="inline-flex items-center gap-2 rounded-lg border-[0.8px] border-[#A4F4CF] bg-transparent px-2 py-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M10.9013 4.99975C11.1296 6.1204 10.9669 7.28546 10.4402 8.30065C9.91352 9.31583 9.05473 10.1198 8.00704 10.5784C6.95935 11.037 5.7861 11.1226 4.68293 10.8209C3.57977 10.5192 2.61338 9.84845 1.94492 8.92046C1.27646 7.99247 0.946343 6.86337 1.00961 5.72144C1.07289 4.57952 1.52572 3.4938 2.29261 2.64534C3.05949 1.79688 4.09407 1.23697 5.22381 1.05898C6.35356 0.880989 7.51017 1.09568 8.50078 1.66725M4.5 5.5L6 7L11 2"
                    stroke="#007A55"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs font-normal leading-4 text-[#007A55]">Posted</span>
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch">
            <Users className="h-5 w-5 text-[#62748E]" />
            <div className="flex flex-col items-start">
              <div className="text-sm font-normal leading-5 text-[#62748E]">Created By</div>
              <div className="text-base font-bold leading-6 text-[#0F172B]">
                {data.createdBy}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch">
            <Building2 className="h-5 w-5 text-[#62748E]" />
            <div className="flex flex-col items-start">
              <div className="text-sm font-normal leading-5 text-[#62748E]">Reference</div>
              <div className="text-base font-normal leading-6 text-[#0F172B]">
                {data.reference}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
