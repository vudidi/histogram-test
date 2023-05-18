import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import SelectMenu from '../SelectMenu/SelectMenu';
import styles from './BarChartComponent.module.scss';
import formatApiData from '../../utils/formatApiData';
import axios from 'axios';

const BarChartComponent = () => {
  const [data, setData] = React.useState([]);
  const [focusBar, setFocusBar] = React.useState(null);
  const [toolTip, setToolTip] = React.useState({
    x: null,
    y: null,
  });

  // Получение кастомного тултипа
  const getIntroOfPage = (payload) => {
    return payload[0].value;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <p
          className={`${styles.chart__tooltip} ${
            toolTip.x === null
              ? `${styles.chart__tooltip_hidden}`
              : `${styles.chart__tooltip_visible}`
          } `}
        >
          {getIntroOfPage(payload)}
        </p>
      );
    }
    return null;
  };

  function setToolTipPosition(data) {
    if (data) {
      setToolTip({ x: data.x, y: data.y });
    }
  }

  // Получение данных для графика
  function getData() {
    return axios
      .get('https://run.mocky.io/v3/0eaf9515-4deb-4581-8811-226b9edc95f4')
      .then((res) => {
        setData(formatApiData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.chart}>
      <div className={styles.chart__container}>
        <h1 className={styles.chart__title}>Динамика дохода</h1>
        <SelectMenu />
      </div>
      <div className={styles.chart__wrapper}>
        <BarChart
          data={data}
          barCategoryGap={11}
          barGap={11}
          width={915}
          height={320}
          barSize={16}
          fill="#000AFF"
          onMouseMove={(e) => {
            if (e.isTooltipActive) {
              setFocusBar(e.activeTooltipIndex);
            } else {
              setFocusBar(null);
            }
          }}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            height={38}
            tickMargin={17}
            textAnchor="middle"
            tick={{ fontSize: 20, fill: '#000' }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={114}
            tickMargin={59}
            tickCount={6}
            tick={{ fontSize: 20, fill: '#000' }}
          />
          <Bar
            dataKey="sum"
            fill="#000AFF"
            radius={[4, 4, 4, 4]}
            onMouseMove={(e) => {
              setToolTipPosition(e);
            }}
            onMouseOut={() => {
              setToolTip({
                x: null,
                y: null,
              });
              setFocusBar(null);
            }}
          >
            {' '}
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                stroke={focusBar === index ? 'rgba(0, 2, 53, 0.5)' : 'false'}
                strokeWidth={3}
              />
            ))}
          </Bar>
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
            position={{ x: toolTip.x, y: toolTip.y - 50 }}
            animationDuration={300}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default BarChartComponent;
