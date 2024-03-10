import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import axios from "axios";

const server = "http://localhost:8080";

const DeviceTypeDiagram = () => {
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        axios.get(`${server}/device/get/${localStorage.getItem("user")}/count/type`)
            .then(res => {
                setPieData(res.data);
                console.log(pieData);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, deviceType }) => {
        const radius = 25 + innerRadius + (outerRadius - innerRadius);
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <>
                <text x={x} y={y} fill="#8884d8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                <text x={x} y={y} dy={18} fontSize={14} fill="#8884d8" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {deviceType}
                </text>
            </>
        );
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <PieChart width={600} height={400}>
                <Pie
                    data={pieData}
                    dataKey="count"
                    nameKey="deviceType"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={renderCustomizedLabel}
                >
                    {
                        pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getRandomColor()} />
                        ))
                    }
                </Pie>
            </PieChart>
        </div>
    );
};

export default DeviceTypeDiagram;