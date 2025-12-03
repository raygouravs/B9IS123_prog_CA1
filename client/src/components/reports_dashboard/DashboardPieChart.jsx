/*
Reference: This pie-chart reusable component using "react-minimal-pie-chart" has been adapted from Chat-GPT. 

           Prompt: Pie chart component using react-minimal-pie-chart

           react-minimal-pie-chart NPM documentation: https://www.npmjs.com/package/react-minimal-pie-chart
*/

import React from "react";
import { PieChart } from "react-minimal-pie-chart";

export default function DashboardPieChart({ data }) {
  return (
    <PieChart
      data={data}
      style={{ height: "250px" }}
      label={({ dataEntry }) =>
        `${dataEntry.title} (${Math.round(dataEntry.percentage)}%)`
      }
      labelStyle={{
        fontSize: "5px",
        fill: "#fff",
      }}
    />
  );
}
