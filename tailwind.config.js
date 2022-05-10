module.exports = {
	content: [ './src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		fontFamily: {
			'marca':['Georgia'],
			'header':['Cambria']
		},
		extend: {
			colors: {
				'verde': '#90C35E',
				'verde-escuro': '#83A451',
				'rosa': '#FEB6B7',
				'rosa-escuro': '#FBA5A6',
			},
			boxShadow:{
				'sombraBox': '0px 0px 17px 0px #c084fc',
						
			},
		},
	},
	plugins: [],
}