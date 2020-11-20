import React, { useState, useEffect } from "react";
import {
  ChartLabel,
  FlexibleWidthXYPlot,
  LineSeries,
  XAxis,
  YAxis,
} from "react-vis";

import {
  getTimeSeries,
  filterData,
  countryAnalysis,
} from "../Data/FetchTimeSeries";

interface SidebarProps {
  feature: any;
  totalData: { usConfirmedTotal: number; usDeathTotal: number };
}

const Sidebar = (props: SidebarProps) => {
  const { feature, totalData } = props;

  const [plotData, setPlotData] = useState(); // to do: rename variables to timeSeriesData, setTimeSeriesData

  // const [selectedState, setSelectedState] = useState();
  const [TotalUSData, setTotalUSData] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any>(null);

  const [totalCases, setTotalCases] = useState<any>(null);
  const [totalNewCases, setTotalNewCases] = useState<any>(null);

  // fetch data on component load
  useEffect(() => {
    const getData = getTimeSeries(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_US.csv"
    );
    getData.then((response) => {
      setPlotData(response); // set the timeseries data after feth
      countryAnalysis(response); // to do: analysis of us as a whole
    });
  }, []);

  // set TotalUSData after fetching timeseries data
  useEffect(() => {
    setTotalUSData(totalData);
  }, [totalData]);

  // filter the fetched data once the state has been clicked
  // run everytime the feature changes
  // to do: distinguish between county clicks and state clicks
  useEffect(() => {
    let result;
    // do not filter unless there is a feature
    if (!!feature) {
      result = filterData(plotData, feature);
      setTotalCases(
        result.filterCounty[feature.properties.name].TotalCasesOverTime
      );
      setTotalNewCases(
        result.filterCounty[feature.properties.name].TotalNewCases
      );
    }
    return setFilteredData(result);
  }, [feature]);

  return (
    <>
      {/* US Overview */}
      {TotalUSData && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            textAlign: "center",
            margin: "5px 0 0 0",
          }}
        >
          <div style={{ border: "3px solid", borderRadius: "15px" }}>
            <h5 style={{ padding: "10px", margin: "0px" }}>
              Total Confirmed Cases: <br />
              {TotalUSData.us_confirmed_total}
            </h5>
          </div>
          <div style={{ border: "3px solid", borderRadius: "15px" }}>
            <h5 style={{ padding: "10px", margin: "0px" }}>
              Total Deaths: <br />
              {TotalUSData.us_death_total}
            </h5>
          </div>
        </div>
      )}
      {/* Per State Clicked */}
      {!!feature && (
        <>
          <hr />
          <div>
            <FlexibleWidthXYPlot
              xType="time"
              height={300}
              margin={{ top: 20, right: 20, left: 65 }}
            >
              <ChartLabel
                text="Total Number of Cases"
                includeMargin={false}
                xPercent={0.4}
                yPercent={0.1}
                style={{ fontSize: "30px" }}
              />
              <XAxis
                // @ts-ignore
                tickFormat={(t) => {
                  const d = new Date(t);
                  return d.toLocaleString("default", { month: "short" });
                }}
              />
              <YAxis title="Number of Cases" />
              <LineSeries data={totalCases} />
            </FlexibleWidthXYPlot>
          </div>
          <div>
            <FlexibleWidthXYPlot
              xType="time"
              height={300}
              margin={{ top: 20, right: 20, left: 65 }}
            >
              <ChartLabel
                text="New Cases per Day"
                includeMargin={false}
                xPercent={0.4}
                yPercent={0.1}
                style={{ fontSize: "30px" }}
              />
              <XAxis
                on0
                // @ts-ignore
                tickFormat={(t) => {
                  const d = new Date(t);
                  return d.toLocaleString("default", { month: "short" });
                }}
              />
              <YAxis title="Number of Cases" />
              <LineSeries
                data={totalNewCases}
                curve={"curveMonotoneX"}
                style={{
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                }}
              />
            </FlexibleWidthXYPlot>
          </div>
          <hr />
          <div style={{ backgroundColor: "#202020", overflow:'scroll' }}>
            <h2
              style={{
                fontFamily: "sans-serif",
                fontSize: "20px",
                fontWeight: "normal",
                margin: "10px 20px",
                textAlign: "center",
                color: "white",
              }}
            >
              Top 10 counties in {feature.properties.name}
            </h2>
            {!!filteredData && <Table data={filteredData.top10} />}
          </div>
        </>
      )}
    </>
  );
};

interface TableProps {
  data?: any;
}

const Table = (props: TableProps) => {
  const { data } = props;
  const counties = Object.keys(data);
  // console.log(data);
  return (
    <div style={{ margin: "0 20px"}}>
      {counties.map((county, index) => {
        let backgroundColor;
        if (index % 2 === 0) {
          backgroundColor = "lightgrey";
        } else {
          backgroundColor = "white";
        }
        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              margin: "5px auto",
              padding:'5px',
              backgroundColor: backgroundColor,
              borderRadius: "10px",
              width: '65%',
              maxWidth: '600px'
              
            }}
          >
            <p
              style={{
                margin: "0",
                width: "200px",
                textAlign: "left",
                // borderRight: "2px solid",
              }}
            >
              {county}
            </p>
            <p style={{ margin: "0", width: "100px", textAlign: "center" }}>
              {data[county]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;