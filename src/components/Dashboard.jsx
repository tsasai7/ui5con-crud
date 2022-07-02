import React from "react";
import { Title } from "@ui5/webcomponents-react";
import { PieChart } from "@ui5/webcomponents-react-charts";

export default function Dashboard() {
  const data = [
    {
      category: "Meal",
      amount: 150,
    },
    {
      category: "Car",
      amount: 460,
    },
  ];

  return (
    <>
      <Title>Dashboard</Title>
      <PieChart
        dimension={{ accessor: "category" }}
        measure={{ accessor: "amount" }}
        dataset={data}
      />
    </>
  );
}
