export const kk10Data = {
	stats: {
		totalTransactions: {
			count: 200,
			change: "+20%",
			label: "dari bulan lalu",
		},
		totalValue: {
			amount: "Rp.190.000.000",
			label: "Volumen transaksi",
		},
		flaggedBlocked: {
			count: 3,
			label: "Perlu peninjauan khusus",
		},
	},
	volumeChart: {
		categories: ["Jan", "Feb", "Mar", "Apr"],
		series: [
			{
				name: "Sales",
				data: [92, 61, 85, 27],
				color: "#0088FF",
			},
			{
				name: "Purchase",
				data: [76, 51, 70, 22],
				color: "#CB30E0",
			},
			{
				name: "Others",
				data: [42, 44, 53, 66],
				color: "#A3B9F8",
			},
		],
	},
	anomalyTrendChart: {
		categories: ["W1", "Feb", "Mar", "Apr", "May", "Jun"],
		series: [
			{
				name: "Anomali",
				data: [40, 100, 20, 80, 5, 25],
				color: "#F54A00",
			},
		],
	},
	transactions: [
		{
			id: "TRX-001",
			date: "2024-05-12",
			type: "Sales",
			value: "Rp.50.000.000",
			status: "Vouching",
			module: "KK 1.0",
		},
		{
			id: "TRX-002",
			date: "2024-05-12",
			type: "Sales",
			value: "Rp.50.000.000",
			status: "Review",
			module: "KK 2.0",
		},
		{
			id: "TRX-003",
			date: "2024-05-12",
			type: "Sales",
			value: "Rp.50.000.000",
			status: "Blocked",
			module: "KK 3.0",
		},
		{
			id: "TRX-004",
			date: "2024-05-12",
			type: "Sales",
			value: "Rp.50.000.000",
			status: "Vouching",
			module: "KK 1.0",
		},
		{
			id: "TRX-005",
			date: "2024-05-12",
			type: "Sales",
			value: "Rp.50.000.000",
			status: "Review",
			module: "KK 1.0",
		},
		{
			id: "TRX-006",
			date: "2024-05-12",
			type: "Sales",
			value: "Rp.50.000.000",
			status: "Vouching",
			module: "KK 1.0",
		},
		{
			id: "TRX-007",
			date: "2024-05-12",
			type: "Sales",
			value: "Rp.50.000.000",
			status: "Review",
			module: "KK 1.0",
		},
		{
			id: "TRX-008",
			date: "2024-05-12",
			type: "Sales",
			value: "Rp.50.000.000",
			status: "Blocked",
			module: "KK 1.0",
		},
	],
};
