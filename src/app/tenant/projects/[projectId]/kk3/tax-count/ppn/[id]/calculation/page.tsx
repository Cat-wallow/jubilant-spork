import { CalculationHeader } from './components/CalculationHeader';
import { BagianA } from './components/BagianA';
import { BagianB } from './components/BagianB';
import { AnalysisSection } from './components/AnalysisSection';
import { ComplianceCheck } from './components/ComplianceCheck';
import { calculationData } from './data';

export default function CalculationPage() {
  return (
    <div className="flex flex-col gap-[30px]">
      <CalculationHeader
        title={calculationData.header.title}
        period={calculationData.header.period}
        tariff={calculationData.header.tariff}
      />

      <div className="flex items-start gap-[30px]">
        <div className="flex flex-1 flex-col gap-6">
          <BagianA
            title={calculationData.bagianA.title}
            items={calculationData.bagianA.items}
            total={calculationData.bagianA.total}
          />

          <AnalysisSection analysis={calculationData.analysis} />
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <BagianB
            title={calculationData.bagianB.title}
            ppnKeluaran={calculationData.bagianB.ppnKeluaran}
            ppnMasukan={calculationData.bagianB.ppnMasukan}
            ppnKurangBayar={calculationData.bagianB.ppnKurangBayar}
          />

          <ComplianceCheck compliance={calculationData.compliance} />
        </div>
      </div>
    </div>
  );
}
