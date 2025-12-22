import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface LampiranSectionProps {
  lampiran: {
    formulir1721I: boolean;
    formulir1721II: boolean;
    formulir1721III: boolean;
    formulir1721IV: boolean;
    formulir1721V: boolean;
    formulir1721VI: boolean;
  };
}

export function LampiranSection({ lampiran }: LampiranSectionProps) {
  const formsList = [
    { key: 'formulir1721I', label: 'Formulir 1721-I' },
    { key: 'formulir1721II', label: 'Formulir 1721-II' },
    { key: 'formulir1721III', label: 'Formulir 1721-III' },
    { key: 'formulir1721IV', label: 'Formulir 1721-IV' },
    { key: 'formulir1721V', label: 'Formulir 1721-V' },
    { key: 'formulir1721VI', label: 'Formulir 1721-VI' }
  ];

  return (
    <Card className="border-black/10 bg-white rounded-[20px]">
      <CardHeader className="bg-[#FAF5FF] border-b-2 border-[#E9D4FF] rounded-t-[20px]">
        <CardTitle className="text-lg font-bold">
          BAGIAN D - LAMPIRAN
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {formsList.slice(0, 3).map((form) => (
              <div key={form.key} className="flex items-center gap-3">
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                  lampiran[form.key as keyof typeof lampiran]
                    ? 'border-green-600 bg-white'
                    : 'border-gray-400'
                }`}>
                  {lampiran[form.key as keyof typeof lampiran] && (
                    <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                  )}
                </div>
                <span className="text-sm">{form.label}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {formsList.slice(3, 6).map((form) => (
              <div key={form.key} className="flex items-center gap-3">
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                  lampiran[form.key as keyof typeof lampiran]
                    ? 'border-green-600 bg-white'
                    : 'border-gray-400'
                }`}>
                  {lampiran[form.key as keyof typeof lampiran] && (
                    <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                  )}
                </div>
                <span className="text-sm">{form.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
