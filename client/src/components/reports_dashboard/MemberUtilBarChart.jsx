/*
Reference: This pie-chart reusable component using "recharts" has been adapted from Chat-GPT. 

           Prompt: Bar chart component using recharts

           recharts NPM documentation: https://www.npmjs.com/package/recharts
*/

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function MemberUtilBarChart({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />

      {/* X axis shows member_id */}
      <XAxis dataKey="member_id" />

      <YAxis />

      <Tooltip />

      {/* Plotting util_percentage */}
      <Bar dataKey="util_percentage" fill="skyblue" />
    </BarChart>
  );
}
