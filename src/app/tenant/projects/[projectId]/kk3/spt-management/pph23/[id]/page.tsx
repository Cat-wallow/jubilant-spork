import { PageHeader } from "./_components/PageHeader";
import { StatusCard } from "./_components/StatusCard";
import { IdentitasSection } from "./_components/IdentitasSection";
import { BagianISection } from "./_components/BagianISection";
import { BagianIISection } from "./_components/BagianIISection";
import { BagianIIISection } from "./_components/BagianIIISection";
import { BagianVISection } from "./_components/BagianVISection";
import { LampiranASection } from "./_components/LampiranASection";
import { LampiranA1Table } from "./_components/LampiranA1Table";
import { LampiranB1Table } from "./_components/LampiranB1Table";
import { LampiranB2Table } from "./_components/LampiranB2Table";
import { PernyataanSection } from "./_components/PernyataanSection";
import { InformasiTambahanSection } from "./_components/InformasiTambahanSection";
import { sptData } from "./_data/mock-data";

export default async function SPTPph23DetailPage() {
  return (
    <div className="flex flex-col gap-8 p-8 bg-white min-h-screen">
      <PageHeader 
        breadcrumb="KK 3.0 > SPT Preview"
        title={sptData.id}
      />
      
      <div className="flex flex-col gap-8">
        <StatusCard
          status={sptData.status}
          completeness={sptData.completeness}
          totalTax={sptData.totalTax}
          dataSource={sptData.dataSource}
        />
        
        <IdentitasSection data={sptData.identitasPemotong} />
        
        <BagianISection data={sptData.bagianI} />
        
        <BagianIISection data={sptData.bagianII} />
        
        <BagianIIISection data={sptData.bagianIII} />
        
        <BagianVISection data={sptData.bagianVI} />
        
        <LampiranASection data={sptData.lampiranA} />
        
        <LampiranA1Table data={sptData.lampiranA1} />
        
        <LampiranB1Table data={sptData.lampiranB1} />
        
        <LampiranB2Table data={sptData.lampiranB2} />
        
        <PernyataanSection 
          pernyataan={sptData.pernyataan}
          validasi={sptData.validasi}
        />
        
        <InformasiTambahanSection data={sptData.informasiTambahan} />
      </div>
    </div>
  );
}
