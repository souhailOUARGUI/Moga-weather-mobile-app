import React, { useEffect, useState, useRef } from "react";
import { View, Text, Dimensions } from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { colors } from "react-native-elements";

export const TempChart = ({ messages }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const processData = () => {
      // Get today's date
      const today = new Date();
      today.setHours(12, 0, 0, 0);

      // Filter messages from the last 7 days at 12:00
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(today);
        day.setDate(today.getDate() - i);

        return {
          date: day.toLocaleDateString(), // Format the date as needed
          temp:
            messages
              .filter(
                (msg) =>
                  new Date(msg.timestamp).getDate() === day.getDate() &&
                  new Date(msg.timestamp).getHours() === 12
              )
              .map((msg) => msg.temperature)[0] || null, // Get the first matching temp or null
        };
      }).reverse();

      // Extract labels and data
      const labels = last7Days.map((day) => day.date);
      const data = last7Days.map((day) => (day.temp !== null ? day.temp : 0));
      console.log("*******************");
      console.log(messages);
      console.log(data);

      setChartData({
        labels,
        datasets: [{ data }],
      });
    };

    processData();
  }, [messages]);

  return (
    <View>
      <Text style={{ marginTop: 15, textAlign: "center", color: colors.white }}>
        Temperature Chart
      </Text>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width}
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
    </View>
  );
};
