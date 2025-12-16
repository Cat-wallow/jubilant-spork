export const documentComplianceData = {
	stats: {
		compliance: {
			percentage: 90,
			completed: 37,
			total: 40,
			label: "Dokument terpenuhi",
		},
		documentGaps: {
			count: 3,
			total: 40,
			label: "tidak lengkap",
		},
		declarations: {
			count: 3,
			label: "Pernyyataan ketiadaan dokumen",
		},
	},
	distributionChart: {
		series: [75, 15, 10],
		labels: ["Lengkap", "Pernyataan", "Tidak Lengkap"],
		colors: ["#0088FF", "#FF8D28", "#FF383C"],
	},
	completenessChart: {
		categories: ["OL", "OP", "PO", "SO", "INV", "FK"],
		series: [
			{
				name: "Lengkap",
				data: [92, 61, 85, 27, 30, 72],
				color: "#0088FF",
			},
			{
				name: "Tidak Lengkap",
				data: [76, 44, 70, 22, 25, 100],
				color: "#A3B9F8",
			},
		],
	},
	documents: [
		{
			id: "1",
			name: "Dokumen Pajak 1",
			type: "PDF",
			attachments: 4,
			visibleToCustomer: false,
		},
		{
			id: "2",
			name: "Dokumen Pajak 2",
			type: "PDF",
			attachments: 4,
			visibleToCustomer: false,
		},
		{
			id: "3",
			name: "Dokumen Pajak 3",
			type: "PDF",
			attachments: 4,
			visibleToCustomer: false,
		},
		{
			id: "4",
			name: "Dokumen Akuntansi 1",
			type: "PDF",
			attachments: 4,
			visibleToCustomer: false,
		},
		{
			id: "5",
			name: "Dokumen Akuntansi 2",
			type: "PDF",
			attachments: 4,
			visibleToCustomer: false,
		},
		{
			id: "6",
			name: "Rekening Koran",
			type: "PDF",
			attachments: 4,
			visibleToCustomer: false,
		},
		{
			id: "7",
			name: "Faktur Pajak 2",
			type: "PDF",
			attachments: 4,
			visibleToCustomer: false,
		},
	],
};
