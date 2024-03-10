import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";

const server = "http://127.0.0.1:8080";

const ValueGraph = () => {
    const [groupedData, setGroupedData] = useState([]);
    const [xMin, setXMin] = useState(0);
    const [xMax, setXMax] = useState(0);

    useEffect(() => {
        axios.get(server + "/message/get/user/" + localStorage.getItem("user") + "/value")
            .then(res => {
                // Group data by 'deviceName' field
                const groupedData = res.data.reduce((result, item) => {
                    if (!result[item.deviceName]) {
                        result[item.deviceName] = [];
                    }
                    result[item.deviceName].push(item);
                    return result;
                }, {});
                const xMin = Math.min(...res.data.map(entry => entry.timestamp));
                const xMax = Math.max(...res.data.map(entry => entry.timestamp));
                setXMin(xMin);
                setXMax(xMax);
                setGroupedData(groupedData);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getColorForSeries = (seriesName) => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
    };

    return (
        <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', overflowX: 'scroll' }}>
            <LineChart width={1000} height={350} data={groupedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" type="number" domain={[xMin, xMax]} />
                <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend
                    verticalAlign="top"
                    height={36}
                    payload={Object.keys(groupedData).map((seriesName, index) => ({
                        id: seriesName,
                        value: seriesName,
                        type: 'line',
                        color: getColorForSeries(seriesName),
                    }))}
                />
                {Object.keys(groupedData).map((seriesName, index) => (
                    <Line
                        key={index}
                        type="monotone"
                        dataKey="value"
                        data={groupedData[seriesName]}
                        stroke={getColorForSeries(seriesName)}
                    />
                ))}
            </LineChart>
        </div>
    );
}

export default ValueGraph;