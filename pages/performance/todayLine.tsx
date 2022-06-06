import React from 'react';
import { Line } from '@ant-design/plots';

export async function getStaticProps() {
  const innerRes = await fetch('https://nest-serverless.vercel.app/user/getLineData',{
    method: 'post',
  });
  const innerResJson = await innerRes.json();
  const tempArray = innerResJson.data ? innerResJson.data : [];
  const reverseArray = tempArray.reverse();
  let data1 = [] as any[];
  let data2 = [] as any[];
  let data3 = [] as any[];
  let data4 = [] as any[];
  let data5 = [] as any[];
  reverseArray.forEach((item: any) => {
    data1.push({
      time: item.time,
      quota1: item.quota1,
    });
    data2.push({
      time: item.time,
      quota2: item.quota2,
    });
    data3.push({
      time: item.time,
      quota3: item.quota3,
    });
    data4.push({
      time: item.time,
      quota4: item.quota4,
    });
    data5.push({
      time: item.time,
      quota5: item.quota5,
    });
  })
  const lastItem = reverseArray[reverseArray.length-1];
  const lineData = [
    {
      name: '指标1',
      total: lastItem.quota1,
      data: data1,
      xField: 'time',
      yField: 'quota1',
    },
    {
      name: '指标2',
      total: lastItem.quota2,
      data: data2,
      xField: 'time',
      yField: 'quota2',
    },
    {
      name: '指标3',
      total: lastItem.quota3,
      data: data3,
      xField: 'time',
      yField: 'quota3',
    },
    {
      name: '指标4',
      total: lastItem.quota4,
      data: data4,
      xField: 'time',
      yField: 'quota4',
    },
    {
      name: '指标5',
      total: lastItem.quota5,
      data: data5,
      xField: 'time',
      yField: 'quota5',
    },
  ];

  return {
    props: {
      lineData: lineData
    },
  };
}

interface IProps {
  lineData?: any[];
}

export default function TodayLine(props: IProps) {

  const config = {
    smooth: true,
    autoFit: true,
    point: {
      state: 'active'
    },
    tooltip: {
      customContent: (title: string, data: any[]): string => {
        return `<div>
          ${
            data.map((item)=>`<div>
              <div>${title}</div>
              <div>${item.value}</div>
            </div>`)
          }
        </div>`
      }
    },
    yAxis: {
      label: null,
      grid: {
        line: {
          style: {
            stroke: '#EFF1F4',
            lineWidth: 2,
            lineDash: [4, 5],
            strokeOpacity: 0.7,
          }
        }
      }
    },
  };

  return (
    <div className='today-line-container'>
      {
        props.lineData && props.lineData.map((item,index) => <div key={index} className='row-cell'>
          <div>
            <div className='cell-name'>{item.name}</div>
            <div className='cell-num'>{item.total}</div>
          </div>
          <div className='right'>
            <Line { ...{...config, animation: false, data:item.data, xField:item.xField, yField:item.yField} } />
          </div>
        </div>)
      }
    </div>
  )
}