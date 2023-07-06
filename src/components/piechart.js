import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 200 },
];
const COLORS = ['#599EEA', '#844FF6', '#F09468', '#FAB70A', '#0FB77A'];

export default class PieChartDefault extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';
    render() {
        return (
            // <ResponsiveContainer>
            <PieChart width={230} height={150} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={this.props.pieData}
                    cx={150}
                    cy={70}
                    innerRadius={40}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
            // </ResponsiveContainer>
        );
    }
}