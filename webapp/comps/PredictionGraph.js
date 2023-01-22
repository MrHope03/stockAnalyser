import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PredictionGraph = ({ series }) => {

	const options = {
		chart: {
			type: 'line',
			zoom: {
				type: 'x',
				enabled: true,
				autoScaleYaxis: true
			},
		},
		tooltip: {
			theme: 'dark',
		},
		title: {
			text: 'Stock Prediction using Markov Chain',
			margin: 10,
			align: 'center',
			style: {
				fontSize: '22px',
				color: '#fff'
			}
		},
		yaxis: {
			forceNiceScale: true,
			decimalsInFloat: 2,
			tickAmount: 10,
			tooltip: {
				enabled: true
			}
		},
		xaxis: {
			type: 'numeric',
			tickAmount: 14,
			tickPlacement: 'on',
		},
	};

	return (
		<Chart options={options} type="line" series={series} width={"100%"} height={500} />
	);
}

export default PredictionGraph;
