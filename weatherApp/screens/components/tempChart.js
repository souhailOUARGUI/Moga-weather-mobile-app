import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { colors } from "react-native-elements";

const sampleMessages = [
  { timestamp: "2024-10-05T12:00:00.000Z", temperature: 22 },
  { timestamp: "2024-10-06T12:00:00.000Z", temperature: 24 },
  { timestamp: "2024-10-07T12:00:00.000Z", temperature: 21 },
  { timestamp: "2024-10-08T12:00:00.000Z", temperature: 23 },
  { timestamp: "2024-10-09T12:00:00.000Z", temperature: 20 },
  { timestamp: "2024-10-10T12:00:00.000Z", temperature: 19 },
  { timestamp: "2024-10-11T12:00:00.000Z", temperature: 22 },
];

export const TempChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    const processData = () => {
      const today = new Date();
      today.setHours(12, 0, 0, 0);

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        return {
          date: day.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          temp:
            sampleMessages.find(
              (msg) =>
                new Date(msg.timestamp).toDateString() === day.toDateString()
            )?.temperature ?? null,
        };
      }).reverse();

      const labels = last7Days.map((day) => day.date);
      const data = last7Days.map((day) => day.temp ?? 0);

      setChartData({
        labels,
        datasets: [{ data }],
      });
    };

    processData();
  }, []);

  return (
    <View>
      <Text style={{ marginTop: 15, textAlign: "center", color: colors.white }}>
        Temperature Chart
      </Text>
      {chartData.datasets[0].data.length > 0 && (
        <LineChart
          data={chartData}
          width={Dimensions.get("window").width - 20}
          height={200}
          yAxisSuffix="°C"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            margin: 10,
          }}
        />
      )}
    </View>
  );
};
