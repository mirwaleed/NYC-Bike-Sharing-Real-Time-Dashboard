
import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts';

class CustomBarChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            station: [],
            width:500,
            height:500,
            selectValue: 0
        }
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(null);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        let currentProps = this.props;

        if(currentProps.chart == 1 && this.state.station.length > 0 && currentProps.isUpdate) {
            currentProps.updateState();
            if(this.state.selectValue == 0 || this.state.selectValue == "") {
                let stations = currentProps.stations.map(element => {
                    let data = element.data[element.data.length-1];
                    return {
                        id: element.id,
                        name: element.name,
                        num_bikes_available: data.num_bikes_available,
                        num_docks_available: data.num_docks_available
                    }
                })    
                return this.setState({
                    selectValue: "",
                    station: stations
                });
            }
            
            let selectStation = currentProps.stations.find(element => element.id == this.state.selectValue);
            let obj = this.state.station[0];
            obj.num_bikes_available = selectStation.data[selectStation.data.length-1]['num_bikes_available'];
            obj.num_docks_available = selectStation.data[selectStation.data.length-1]['num_docks_available'];
            return this.setState({
                station: [obj]
            })
        }

        if(currentProps.chart === 1 && this.state.station.length < 1) {
            if(currentProps.stations !== prevProps.stations) {
                let stations = currentProps.stations.map(element => {
                    let data = element.data[element.data.length-1];
                    return {
                        id: element.id,
                        name: element.name,
                        num_bikes_available: data.num_bikes_available,
                        num_docks_available: data.num_docks_available
                    }
                })
    
                if(stations)
                    return this.setState({
                        station: stations
                    });
            }
        }

        if(currentProps.chart === 2 && this.state.station.length < 1) {
            let station = currentProps.stations[0];
            if(station)
                return this.setState({
                    selectValue: station.id,
                    station: station.data
                });
        }
    }

    method(_data) {
        this.onChangeSelect(_data);
    }

    onChangeSelect(e) {
        let target_value = e.target ? e.target.value : e;
        
        if(!target_value) {
            if(this.props.chart === 2) return;

            let stations = this.props.stations.map(element => {
                let data = element.data[element.data.length-1];
                return {
                    id: element.id,
                    name: element.name,
                    num_bikes_available: data.num_bikes_available,
                    num_docks_available: data.num_docks_available
                }
            })

            return this.setState({
                selectValue: "",
                station: stations
            });
        }

        this.setState({
            selectValue: target_value
        })
        
        let station = this.props.stations.find(element => element.id === target_value);
        if(this.props.chart === 1) {
            station = {
                id: station.id,
                name: station.name,
                num_bikes_available: station['data'][station.data.length-1].num_bikes_available,
                num_docks_available: station['data'][station.data.length-1].num_docks_available,
            }
        }

        station = this.props.chart === 2 ? station.data : [station]
        this.setState({
            station: station
        });
    }

    render() {
        return (
            <div>
                <div className="form-group row mt-10">
                    <label htmlFor="select"  className="col-4 col-form-label">Select Station: </label>

                    <select name="select" className="form-control col-6" onChange={this.onChangeSelect} value={this.state.selectValue} >
                        {
                            this.props.chart == 1 &&
                                <option value="" key="">All</option>
                        }
                        {
                            this.props.chart == 2 &&
                                <option value="" key=""></option>
                        }
                        {
                            this.props.stations && 
                                this.props.stations.map(n =>  { 
                                    return (<option value={n.id} key={n.id} >{n.name}</option>);
                                })
                        }
                    </select>
                </div>
            
                <BarChart 
                    width={this.state.width} 
                    height={this.state.height} 
                    data={this.state.station} 
                    margin={{top: 50, right: 30, left: 20, bottom: 20}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                
                    <XAxis dataKey='name' angle={-90} textAnchor="end" interval={0} hide/>
                    <YAxis />
                    <Tooltip />

                    <Legend verticalAlign="bottom" wrapperStyle={{ lineHeight: '40px' }}/>
                                        
                    {
                        this.state.station.length > 10 && 
                            <Brush height={30} stroke="#8884d8" offset={20} startIndex={0} endIndex={100}/>
                    }
                    {
                        this.state.station.length > 10 && 
                            <Bar dataKey="num_bikes_available" stackId="stack" name="No of available bikes"  fill="#82ca9d"/>
                    } 
                    {
                        this.state.station.length > 10 && 
                            <Bar dataKey="num_docks_available" stackId="stack" name="No of available docks" fill="#8884d8"/>
                    }

                    {
                        this.state.station.length < 10 && 
                            <Bar dataKey="num_bikes_available" name="No of available bikes"  fill="#82ca9d"/>
                    }
                    {
                        this.state.station.length < 10 && 
                            <Bar dataKey="num_docks_available" name="No of available docks" fill="#8884d8"/>
                    }

                </BarChart>
            </div>
        );
    }
}

export default CustomBarChart;