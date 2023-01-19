import {
	Chart,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
} from "chart.js";

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

import { Line } from "react-chartjs-2"

const LineGraph = () => {
	const data = {
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
		datasets: [
			{
				label: "Data 1",
				data: [33, 53, 85, 41, 44, 65],
				fill: true,
				backgroundColor: "rgba(75,192,192,0.2)",
				borderColor: "rgba(75,192,192,1)"
			},
			{
				label: "Data 2",
				data: [33, 25, 35, 51, 54, 76],
				fill: false,
				borderColor: "#742774"
			}
		]
	};
	const legend = {
		display: true,
		position: "bottom",
		labels: {
			fontColor: "#323130",
			fontSize: 14
		}
	};

	const options = {
		title: {
			display: true,
			text: "Chart Title"
		},
		scales: {
			yAxes: [
				{
					ticks: {
						suggestedMin: 0,
						suggestedMax: 100
					}
				}
			]
		}
	};
	return (
		<div className="graph">
			<Line data={data} legend={legend} options={options} />
		</div >
	);
}

export default LineGraph;
