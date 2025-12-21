export const mockData = {
	sections: [
		{
			title: '1. Penghasilan Neto Komersial Dalam Negeri',
			items: [
				{
					id: '1a',
					label: 'a. Peredaran Usaha',
					value: 'Rp 198.050.000',
					badge: '1a',
					editable: false,
				},
				{
					id: '1b',
					label: 'b. Harga Pokok Penjualan',
					value: 'Rp 114.950.000',
					badge: '1b',
					editable: false,
				},
				{
					id: '1c',
					label: 'c. Biaya Usaha Lainnya',
					value: 'Rp 58.300.000',
					badge: '1c',
					editable: false,
				},
				{
					id: '1d',
					label: 'd. Penghasilan Neto dari Usaha',
					value: 'Rp 24.800.000',
					badge: '1d = 1a - 1b - 1c',
					badgeColor: 'emerald',
				},
			],
		},
		{
			title: '5. Penyesuaian Fiskal Positif',
			items: [
				{
					id: '5a',
					label: 'a. Biaya yang tidak dapat dikurangkan',
					description: '5a',
					value: 'Rp 2.500.000',
					editable: true,
				},
				{
					id: '5b',
					label: 'b. Perbedaan metode penyusutan',
					description: '5b',
					value: '-',
					editable: true,
				},
			],
		},
		{
			title: '6. Penyesuaian Fiskal Negatif',
			items: [
				{
					id: '6a',
					label: 'a. Penghasilan yang tidak kena pajak',
					description: '6a',
					value: '-',
					editable: true,
				},
			],
		},
	],
	total: {
		label: '8. Penghasilan Neto Fiskal',
		description: 'Total',
		value: 'Rp 22.300.000',
		badge: 'Final Result',
	},
};
