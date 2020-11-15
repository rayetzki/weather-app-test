import { CartesianGrid, Legend, Line, LineChart, Tooltip, YAxis } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div>
        <p>{payload[0].value} °C</p>
        <p>{payload[0].payload.time}</p>
        <p>{payload[0].payload.description}</p>
      </div>
    );
  }

  return null;
};

export const WeatherChart = ({
    temperatureData
}) => (
     <LineChart
        className="App__Chart"
        width={500}
        height={300}
        data={temperatureData}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis dataKey="temperature" unit={'°C'} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="maxTemperature" stroke="#82ca9d" />
        <Line type="monotone" dataKey="maxTemperature" stroke="#00bfff" />
    </LineChart>
);