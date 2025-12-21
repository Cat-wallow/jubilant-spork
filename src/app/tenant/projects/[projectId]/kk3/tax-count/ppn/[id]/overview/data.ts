export const overviewData = {
  dashboard: {
    status: 'In Progress',
    period: '03/2024',
    completeness: 85,
    deadline: '2024-04-30',
    remainingDays: 12,
  },
  ppnKeluaran: {
    amount: 22000000,
    dpp: 200000000,
  },
  ppnMasukan: {
    amount: 18000000,
    description: 'Dapat dikreditkan',
  },
  netPPN: {
    amount: 4000000,
    description: 'Kurang Bayar',
  },
  effectiveRate: {
    rate: 10.8,
    target: 11,
  },
  totalTransaction: {
    total: 156,
    keluaran: 45,
    masukan: 89,
  },
  autoFill: {
    percentage: 95,
    source: 'Dari KK2 Journals',
  },
  trendAnalysis: [
    {
      month: 'Jan 2024',
      ppnKeluaran: 18000000,
      ppnMasukan: 15000000,
      net: 3000000,
    },
    {
      month: 'Feb 2024',
      ppnKeluaran: 20000000,
      ppnMasukan: 16500000,
      net: 3500000,
    },
    {
      month: 'Mar 2024',
      ppnKeluaran: 22000000,
      ppnMasukan: 18000000,
      net: 4000000,
    },
  ],
  growth: {
    ppnKeluaran: 22.2,
    ppnMasukan: 20.0,
    period: 'Jan-Mar 2024',
  },
};
