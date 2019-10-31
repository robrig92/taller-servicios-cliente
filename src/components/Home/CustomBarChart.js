import React, { Component } from 'react';
import {
    BarChart,
    Tooltip,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Bar,
    ResponsiveContainer
} from 'recharts';

class CustomBarChart extends Component {
    render() {
        let {
            data,
            title,
            xaxisDataKey
        } = this.props;

        return (
            <div className="row" style={{marginTop: '10px'}}>
                <div className="col-12">
                    <h3>{title}</h3>
                </div>
                <div className="col-12">
                    <ResponsiveContainer height={500} width="100%">
                        <BarChart data={data.data} 
                            margin={{top: 10}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey={xaxisDataKey}/>
                            <YAxis />
                            <Tooltip/>
                            <Legend />
                            {
                                data.config.map((bar, index) => {
                                    return (
                                        <Bar 
                                            key={index}
                                            dataKey={bar.dataKey}
                                            fill={bar.fill} />
                                    );
                                })
                            }
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

export default CustomBarChart;