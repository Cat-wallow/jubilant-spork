export interface AffiliateEntry {
  id: number;
  name: string | null;
  address: string | null;
  npwp: string | null;
  investmentAmount: number | null;
  percentage: number | null;
}

export const affiliateData: AffiliateEntry[] = [
  {
    id: 1,
    name: "PT ANAK USAHA TEKNOLOGI",
    address: "Jakarta Selatan",
    npwp: "01.234.567.8-901.002",
    investmentAmount: 15000000000,
    percentage: 75,
  },
  {
    id: 2,
    name: "PT MITRA STRATEGIS INDONESIA",
    address: "Bandung",
    npwp: "02.345.678.9-012.003",
    investmentAmount: 5000000000,
    percentage: 30,
  },
  {
    id: 3,
    name: "CV DIGITAL SOLUTIONS",
    address: "Surabaya",
    npwp: "03.456.789.0-123.004",
    investmentAmount: 2500000000,
    percentage: 25,
  },
  {
    id: 4,
    name: null,
    address: null,
    npwp: null,
    investmentAmount: null,
    percentage: null,
  },
  {
    id: 5,
    name: null,
    address: null,
    npwp: null,
    investmentAmount: null,
    percentage: null,
  },
];

export const getTotalInvestment = () => {
  return affiliateData.reduce(
    (sum, item) => sum + (item.investmentAmount || 0),
    0
  );
};

export const getCompanyCount = () => {
  return affiliateData.filter((item) => item.name !== null).length;
};

export const getMajorityShareholding = () => {
  const maxPercentage = Math.max(
    ...affiliateData.map((item) => item.percentage || 0)
  );
  const company = affiliateData.find((item) => item.percentage === maxPercentage);
  return {
    percentage: maxPercentage,
    company: company?.name || "",
  };
};
