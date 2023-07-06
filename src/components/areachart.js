import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AreaChartDisplay = props => {
    return (
        <div>
            <ResponsiveContainer width='100%' height={400}>
                <AreaChart data={props.areaData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF5403" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#FF5403" stopOpacity={0.001} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="1 1" />
                    <Tooltip />
                    <Area type="monotone" dataKey="pv" stroke="#FF5403" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
                {/* linear-gradient(180deg, rgba(255, 84, 3, 0.2) 0%, rgba(255, 84, 3, 0) 100%); */}
            </ResponsiveContainer>
        </div>
    )
}

export default AreaChartDisplay;