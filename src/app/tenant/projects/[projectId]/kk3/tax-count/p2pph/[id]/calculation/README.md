# Tax Calculation Pages - PPh 2/3

This directory contains two main calculation views for PPh 2/3 tax analysis:

## 📁 Structure (Vertical Architecture)

```
calculation/
├── by-object/                    # Per Objek Pajak (Tax Object) view
│   ├── _components/
│   │   ├── CategoryCard.tsx      # Main category card with expandable sections
│   │   ├── SubCategorySection.tsx # Expandable subcategory with transactions
│   │   └── TransactionTable.tsx  # Transaction detail table
│   ├── _data/
│   │   └── mock-data.ts          # Mock data for tax categories
│   └── page.tsx                  # Main page component
│
├── trend/                        # Trend Analysis view
│   ├── _components/
│   │   ├── TrendChart.tsx        # Monthly trend line chart (Recharts)
│   │   ├── InsightCards.tsx      # Insight cards with different types
│   │   └── TaxRateSummary.tsx    # Tax rate summary cards
│   ├── _data/
│   │   └── mock-data.ts          # Mock data for trends
│   └── page.tsx                  # Main page component
│
├── by-article/                   # Per Pasal (existing)
├── layout.tsx                    # Layout with tabs and stats
└── README.md                     # This file
```

## 🎨 Components Used (Shadcn UI)

All components use Shadcn UI exclusively:

- **Card** (`@/components/ui/card`) - Main container component
- **Badge** (`@/components/ui/badge`) - Status and category badges
- **Recharts** - Line chart for trend visualization
- **Lucide Icons** - All icons (ChevronDown, ChevronUp, Info, etc.)

## 📊 Page: by-object (Per Objek Pajak)

Shows tax calculation breakdown by tax objects with:

- **CategoryCard**: Displays each tax category (Jasa Profesional, Sewa, Bunga dan Diskonto)
  - Header with category name, pasal reference, tax rate, and totals
  - Summary stats grid (Total Objek, DPP, PPh Dipotong, Jumlah Transaksi)
  - Expandable subcategories

- **SubCategorySection**: Expandable sections for each subcategory
  - Shows transaction count and totals
  - Expandable to show detailed transactions
  
- **TransactionTable**: Detailed transaction list
  - Transaction ID, date, vendor, voucher
  - Amount, tax, and status badges
  - Color-coded status (Selesai: black, Review: gray, Pending: white)

### Mock Data Structure

```typescript
{
  name: "Jasa Profesional",
  pasal: "Pasal 23 ayat (1) huruf c",
  taxRate: "2%",
  totalTax: 8900000,
  transactionCount: 89,
  subCategories: [
    {
      name: "Jasa Konsultasi",
      transactions: [...]
    }
  ]
}
```

## 📈 Page: trend (Trend Analysis)

Shows monthly trends and insights with:

- **TrendChart**: Line chart showing monthly trends
  - 4 lines: PPh 21, PPh 23, PPh 25, PPh 29
  - Responsive design using Recharts
  - Color-coded: Blue (PPh 21), Green (PPh 23), Orange (PPh 25), Red (PPh 29)
  - Formatted tooltips with IDR currency

- **InsightCards**: 3 types of insight cards
  - **Info** (Blue): General information
  - **Success** (Green): Positive insights
  - **Warning** (Orange): Items requiring attention
  
- **TaxRateSummary**: Summary of tax rates
  - PPh 21: Progresif (5%-30%)
  - PPh 23: 2% / 15%
  - PPh 25: 25%

### Mock Data Structure

```typescript
monthlyTrendData: {
  month: "Jan",
  pph21: 18500000,
  pph23: 7200000,
  ...
}

insights: {
  title: "PPh 21 Dominan",
  description: "...",
  type: "info" | "success" | "warning"
}
```

## 🎯 Features

### By-Object Page
- ✅ Fully responsive design
- ✅ Expandable/collapsible sections
- ✅ Color-coded transaction status
- ✅ Nested data structure (Category → Subcategory → Transactions)
- ✅ Clean dummy data for 3 main categories

### Trend Page
- ✅ Interactive line chart with Recharts
- ✅ Formatted currency tooltips
- ✅ Type-based insight cards
- ✅ Responsive grid layout
- ✅ 6 months of trend data

## 🚀 Usage

Navigate to:
- `/tenant/projects/[projectId]/kk3/tax-count/p2pph/[id]/calculation/by-object`
- `/tenant/projects/[projectId]/kk3/tax-count/p2pph/[id]/calculation/trend`

Or use the tabs in the calculation layout to switch between views.

## 🎨 Design Tokens

Colors match the Figma design:
- Primary Text: `#0A0A0A`
- Secondary Text: `#717182`
- Success: `#00A63E` / `#DCFCE7`
- Info: `#155DFC` / `#EFF6FF`
- Warning: `#F54900` / `#FFF7ED`
- Background: `#ECEEF0`

Border radius: `14px` for cards, `10px` for inner elements
