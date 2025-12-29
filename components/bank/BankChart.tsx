"use client";

import { IBankAccount } from "@/types/interfaces/IBankAccount";
import { Pie, PieChart, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#3cbf99", "#c10008"]; // vert / rouge

const BankChart = ({
  isAnimationActive = true,
  bankAccount,
}: {
  isAnimationActive?: boolean;
  bankAccount: IBankAccount;
}) => {
  const data = [
    { label: "Revenus", value: bankAccount.balance },
    {
      label: "Dépenses",
      value: bankAccount?.expenses?.reduce(
        (prev, curr) => prev + curr.expense,
        0
      ),
    },
  ];

  return (
    <PieChart
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        dataKey="value"
        nameKey="label"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        isAnimationActive={isAnimationActive}
        // label={({ name, value }) => `${name}: ${value}`}
        label={({ percent }) => `${(percent! * 100).toFixed(1)}%`}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip formatter={(v) => `${v} €`} />
      <Legend verticalAlign="top" iconType="circle" />
      {/* <Legend content={renderLegend} /> */}
    </PieChart>
  );
};

export default BankChart;

// const renderLegend = (props: any) => {
//   const { payload } = props;
//   return (
//     <ul className="p-3 space-y-2">
//       {payload.map((entry: any, index: number) => (
//         <li key={index} className="flex items-center gap-2">
//           <span
//             style={{
//               backgroundColor: entry.color,
//               width: 10,
//               height: 10,
//               borderRadius: "50%",
//             }}
//           />
//           <span style={{ color: entry.color }}>{entry.value}</span>
//         </li>
//       ))}
//     </ul>
//   );
// };
