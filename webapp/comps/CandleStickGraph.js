import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CandleStickGraph = ({ hist }) => {
	const options = {
		chart: {
			type: 'candlestick',
			foreColor: '#fff',
		},
		animations: {
			enabled: true,
			easing: 'easeinout',
			speed: 800,
			animateGradually: {
				enabled: true,
				delay: 150
			},
			dynamicAnimation: {
				enabled: true,
				speed: 450
			}
		}, tooltip: {
			theme: 'dark',
		},
		title: {
			text: 'Market for past 5 year',
			margin: 10,
			align: 'center',
			style: {
				fontSize: '22px',
				color: '#fff'
			}
		},
		xaxis: {
			type: 'datetime',
			tickPlacement: 'on',
		},
		yaxis: {
			forceNiceScale: true,
			decimalsInFloat: 2,
			tickAmount: 10,
			tooltip: {
				enabled: true
			}
		},
	};

	const data = hist.map((val) => ({
		x: new Date(val.date),
		y: [val.open, val.low, val.high, val.close],
	}));
	const series = [{ data }];

	return (
		<Chart options={options} series={series} type="candlestick" width="100%" height={500} />
	);
}

export default CandleStickGraph;
