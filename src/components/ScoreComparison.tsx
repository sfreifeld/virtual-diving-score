import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Score {
  difficulty: number;
  execution: number;
}

interface Props {
  userScore: Score;
  judgeScore: Score;
}

const ScoreComparison: React.FC<Props> = ({ userScore, judgeScore }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      drawChart();
    }
  }, [userScore, judgeScore]);

  const drawChart = () => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const width = 300;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const x = d3.scaleBand()
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height - margin.bottom, margin.top]);

    const data = [
      { category: 'Difficulty', user: userScore.difficulty, judge: judgeScore.difficulty },
      { category: 'Execution', user: userScore.execution, judge: judgeScore.execution },
    ];

    x.domain(data.map(d => d.category));
    y.domain([0, d3.max(data, d => Math.max(d.user, d.judge)) || 10]);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.selectAll(".user-bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "user-bar")
      .attr("x", d => x(d.category) || 0)
      .attr("y", d => y(d.user))
      .attr("width", x.bandwidth() / 2)
      .attr("height", d => height - margin.bottom - y(d.user))
      .attr("fill", "steelblue");

    svg.selectAll(".judge-bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "judge-bar")
      .attr("x", d => (x(d.category) || 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.judge))
      .attr("width", x.bandwidth() / 2)
      .attr("height", d => height - margin.bottom - y(d.judge))
      .attr("fill", "orange");

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .text("Score Comparison");

    const legend = svg.append("g")
      .attr("transform", `translate(${width - margin.right}, ${margin.top})`);

    legend.append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "steelblue");

    legend.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text("User");

    legend.append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "orange")
      .attr("y", 20);

    legend.append("text")
      .attr("x", 20)
      .attr("y", 32)
      .text("Judge");
  };

  return (
    <div>
      <h3>Score Comparison</h3>
      <svg ref={chartRef} width={300} height={200}></svg>
    </div>
  );
};

export default ScoreComparison;