import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Check, Clock, AlertTriangle } from 'lucide-react';

interface ApprovalWorkflowProps {
  approval: {
    initiator: {
      name: string;
      role: string;
      date: string;
    };
    reviewer: {
      name: string;
      status: string;
      date: string;
    };
    finalApprover: {
      name: string;
      status: string;
      date: string;
    };
    authMatrix: string;
  };
}

export function ApprovalWorkflow({ approval }: ApprovalWorkflowProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Users className="h-4 w-4" />
          Approval Workflow & Authorization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <h4 className="text-sm font-medium">Initiator</h4>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{approval.initiator.name}</p>
              <p className="text-xs text-gray-600">{approval.initiator.role}</p>
              <p className="text-xs text-gray-500">{approval.initiator.date}</p>
            </div>
          </div>

          <div className="space-y-2 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <h4 className="text-sm font-medium">Reviewer</h4>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{approval.reviewer.name}</p>
              <p className="text-xs text-gray-600">{approval.reviewer.status}</p>
              <p className="text-xs text-gray-500">{approval.reviewer.date}</p>
            </div>
          </div>

          <div className="space-y-2 rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <h4 className="text-sm font-medium">Final Approver</h4>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{approval.finalApprover.name}</p>
              <p className="text-xs text-gray-600">{approval.finalApprover.status}</p>
              <p className="text-xs text-gray-500">{approval.finalApprover.date}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <h4 className="text-sm font-medium">Authorization Matrix</h4>
          </div>
          <p className="text-xs text-gray-600">{approval.authMatrix}</p>
        </div>
      </CardContent>
    </Card>
  );
}
