import React, { useEffect, useState } from "react";
import { Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Countries from "../components/countries";

import Logo from "../assets/images/logo.svg";
import { ReactComponent as MoreDetails } from "../assets/images/more_horiz.svg";
import { ReactComponent as Dashboard } from "../assets/images/dashboard.svg";
import { ReactComponent as Edit } from "../assets/images/edit.svg";
import { ReactComponent as Group } from "../assets/images/group.svg";
import { ReactComponent as HourglassEmpty } from "../assets/images/hourglass_empty.svg";
import { ReactComponent as AddPhoto } from "../assets/images/add_a_photo.svg";
import { ReactComponent as Delete } from "../assets/images/delete.svg";
import { ReactComponent as Alarm } from "../assets/images/alarm.svg";
import { ReactComponent as FilePresent } from "../assets/images/file_present.svg";
import { ReactComponent as Subscriptions } from "../assets/images/subscriptions.svg";

import { ReactComponent as Instagram } from "../assets/images/social-Instagram.svg";
import { ReactComponent as Facebook } from "../assets/images/social-fb.svg";
import { ReactComponent as LinkedIn } from "../assets/images/social-linkedin.svg";
import { ReactComponent as Google } from "../assets/images/social-google.svg";

import Daniels from "../assets/images/daniels.png";

// import Nigeria from "../assets/images/nigeria.svg";
import AreaChart from "../components/areachart";

import Info from "../assets/images/info.svg";
import PieChart from "../components/piechart";
import { fetchUserData } from "../components/api-routes.js";

const AppData = () => {

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const [graphData, setGraphData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [regionData, setRegionData] = useState([]);
    const [fetchingData, setFetchingData] = useState(true);
    const [fixedNav, setFixedNav] = useState(false);
    const [allCountriesData] = useState(Countries);
    const [viewsCount, setViewsCount] = useState(0);

    const colors = ['#599EEA', '#844FF6', '#F09468', '#FAB70A', '#0FB77A'];

    const openNotificationWithIcon = (type, message) => {
        notification[type]({ description: message, placement: "bottom-right" });
    };

    const fetchUserRecords = async () => {
        try {
            let userFetch = await fetchUserData();
            if (userFetch) {
                let { graph_data, top_sources, top_locations } = userFetch.data;
                let countryRecord = [];
                let regionRecord = [];
                let totalCount = 0;
                top_locations.forEach((colorData, index) => {
                    let flag = "";
                    for (let countries of Object.values(allCountriesData)) {
                        if (countries.name === colorData.country) {
                            flag = countries.flag;
                        }
                    }
                    totalCount += colorData.count;
                    let newColorData = {
                        flag,
                        color: colors[index],
                        name: colorData.country,
                        value: colorData.percent,
                    }
                    countryRecord.push(newColorData);
                })
                top_sources.forEach((colorData, index) => {
                    let newColorData = {
                        img: `${colorData.source.substr(0, 1).toUpperCase()}${colorData.source.substr(1)}`,
                        color: colors[index],
                        name: colorData.source.substr(0, 1).toUpperCase() + colorData.source.substr(1),
                        value: colorData.percent,
                    }
                    regionRecord.push(newColorData);
                })
                setViewsCount(totalCount);
                let chartLog = [];
                for (let chartData of Object.keys(graph_data.views)) {
                    let newObj = {
                        name: `${chartData.split('-')[1]} / ${chartData.split('-')[2]}`,
                        pv: graph_data.views[chartData],
                        amount: graph_data.views[chartData]
                    }
                    chartLog.push(newObj);
                }
                setCountryData(countryRecord);
                setRegionData(regionRecord);
                setFetchingData(false);
                setGraphData(chartLog);
            } else {
                openNotificationWithIcon('error', 'An error occurred while fetching data. Please reload to try again')
            }
        } catch (err) {
            openNotificationWithIcon('error', 'An error occurred while fetching data. Please reload to try again')
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY;
            if (offset > 200) {
                setFixedNav(true);
            }
            else {
                setFixedNav(false);
            }
        })
    }, [])

    useEffect(() => {
        fetchUserRecords();
    }, [])

    return (
        <div className="app-display">
            <Spin indicator={antIcon} spinning={fetchingData}>
                <div className="main-page">
                    <div className="side-nav">
                        <div>
                            <img src={Logo} className="logo" alt="Company Logo" />
                            <div>
                                <ul>
                                    <li className="active-menu"><span className="first-spaner"><span className="first-span"><Dashboard /></span> <p>Dashboard</p></span></li>
                                    <li><span className="first-spaner"><span className="first-span"><Edit /></span> <p>Item 1</p></span></li>
                                    <li><span className="first-spaner"><span className="first-span"><Group /></span> <p>Item 2</p></span></li>
                                    <li><span className="first-spaner"><span className="first-span"><HourglassEmpty /></span> <p>Item 3</p></span></li>
                                </ul>
                                <ul>
                                    <h4>OTHERS 1</h4>
                                    <li><span className="first-spaner"><span className="first-span"><AddPhoto /></span> <p>Item 4</p></span></li>
                                    <li><span className="first-spaner"><span className="first-span"><Delete /></span> <p>Item 5</p></span></li>
                                </ul>
                                <ul>
                                    <h4>OTHERS 2</h4>
                                    <li><span className="first-spaner"><span className="first-span"><Subscriptions /></span> <p>Item 6</p></span></li>
                                    <li><span className="first-spaner"><span className="first-span"><FilePresent /></span> <p>Item 7</p></span></li>
                                    <li><span className="first-spaner"><span className="first-span"><Alarm /></span> <p>Item 8</p></span></li>
                                </ul>
                            </div>
                            <div>
                                <div className="grid-flex user-det">
                                    <div className="user-details">
                                        <img src={Daniels} alt="daniels" />
                                        <p>Blessing Daniels</p>
                                    </div>
                                    <MoreDetails />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-sect">
                        <div>
                            <div className={`page-cover ${fixedNav ? 'fixed' : ''}`}>
                                <h4 className={`page-title`}>Dashboard</h4>
                            </div>
                            <div className="grid-flex greeting-flex" style={{ alignItems: 'center' }}>
                                <div>
                                    <h2 className="page-greeting-title">Good morning, Blessing ⛅️</h2>
                                    <p className="page-greetinig-summary">Check out your dashboard summary.</p>
                                </div>
                                <div>
                                    <a className="analytics">View analytics</a>
                                </div>
                            </div>
                            <div className="tag-box">
                                <div className="tag">
                                    <p>1 Day</p>
                                </div>
                                <div className="tag">
                                    <p>3 Days</p>
                                </div>
                                <div className="tag">
                                    <p>7 Days</p>
                                </div>
                                <div className="tag">
                                    <p>30 Days</p>
                                </div>
                                <div className="tag active">
                                    <p>All Time</p>
                                </div>
                                <div className="tag">
                                    <p>Custom Date</p>
                                </div>
                            </div>
                            <div className="area-chart-sect">
                                <div className="grid-flex">
                                    <h2>Page Views</h2>
                                    <img src={Info} alt="info" />
                                </div>
                                <div>
                                    <h5>All time</h5>
                                    <h1>{viewsCount}</h1>
                                </div>
                                <div className="">
                                    <AreaChart areaData={graphData} />
                                </div>
                            </div>
                            <div className="grid-2 quick-data-grid">
                                <div className="quick-data">
                                    <div className="grid-flex data-title">
                                        <div>
                                            <h3>Top Locations</h3>
                                        </div>
                                        <div>
                                            <a hre="#">View full reports</a>
                                        </div>
                                    </div>
                                    <div className="grid-flex sec-grid">
                                        <div>
                                            <ul>
                                                {
                                                    countryData.map((location, index) => {
                                                        return (
                                                            <li key={index}><img src={location.flag} alt={`${location.name} flag`} />
                                                                <span className="flag-box">
                                                                    <span className="location-name">{location.name}<b>{location.value}%</b></span>
                                                                    <span
                                                                        style={{ background: `${location.color}` }}
                                                                        className="color-bar"></span>
                                                                </span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div>
                                            <PieChart pieData={countryData} />
                                        </div>
                                    </div>
                                </div>
                                <div className="quick-data">
                                    <div className="grid-flex data-title">
                                        <div>
                                            <h3>Top Referral source</h3>
                                        </div>
                                        <div>
                                            <a hre="#">View full reports</a>
                                        </div>
                                    </div>
                                    <div className="grid-flex sec-grid">
                                        <div>
                                            <ul>
                                                {
                                                    regionData.map((location, index) => {
                                                        return (
                                                            <li key={index}>
                                                                {
                                                                    location.name === "Google" ?
                                                                        <Google /> :
                                                                        location.name === "Facebook" ?
                                                                            <Facebook /> :
                                                                            location.name === "Instagram" ?
                                                                                <Instagram /> :
                                                                                <LinkedIn />
                                                                }
                                                                <span className="flag-box">
                                                                    <span className="location-name">{location.name}<b>{location.value}%</b></span>
                                                                    <span
                                                                        style={{ background: `${location.color}` }}
                                                                        className="color-bar"></span>
                                                                </span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                        <div>
                                            <PieChart pieData={regionData} />
                                            {/* <PieChart /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin >
        </div >
    )
}

export default AppData;