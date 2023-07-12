import { Card, Title, LineChart } from "@tremor/react";
  

const MyLineChart = ({chartData,title}) => (
    <Card>
      <Title>{title}</Title>
      <LineChart
        className="mt-6 w-full h-72"
        data={chartData}
        index="day"
        categories={["Number of sales"]}
        colors={["orange"]}
        yAxisWidth={40}
        curveType="natural"
        showLegend={false}
      />
    </Card>
  )

export default MyLineChart