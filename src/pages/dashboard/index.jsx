import React, { useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { getAnalyzeOverview } from '../../redux/analyzeReducer';
import { openSnackBar } from '../../redux/snackBarReducer';
import { useDispatch } from 'react-redux';

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        let res = await dispatch(getAnalyzeOverview());
        console.log("analyzed overview:", res)
      } catch (err) {
        dispatch(openSnackBar({ status: "error", message: "Error occured fetching data" }))
        // console.log('Error occured when fetching data.');
      }
    })();
  }, []);

  // Pie Chart Data
  const wolf_data = [
    { value: 8087, label: 'WOLF Holders', color: '#9001CB' }, //, color: '#610094'
    { value: 268, label: 'Overlap Holders', color: '#DA00FF' }
  ];

  const brett_data = [
    { value: 2399, label: 'BRETT Holders', color: '#02B2AF' }, //, color: '#610094'
    { value: 268, label: 'Overlap Holders', color: '#72CCFF' }
  ];

  const size = {
    width: 300,
    height: 150,
  };

  const StyledText = styled('text')(({ }) => ({
    fill: 'white',
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 25,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  // Line Chart Data
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
  ];

  return (
    <div className='bg-slate-950 w-full text-white'>
      <div>
        <h1 className='text-center text-3xl font-bold p-2'>BRETT & WOLF Analyze Result</h1>

        <div className='grid grid-cols-12'>
          <div className='col-span-3 mx-auto space-y-12'>
            <div className='w-[416px] '>
              <p className='text-center text-2xl'>
                Overlap of Top Holders: {268}
              </p>
              <br />
              <div className='flex'>
                <div className='w-52'>
                  <p className='text-center text-xl'>
                    WOLF
                  </p>
                  <PieChart series={[{ data: wolf_data, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>{3.53} %</PieCenterLabel>
                  </PieChart>
                </div>

                <div className='w-52'>
                  <p className='text-center text-xl'>
                    BRETT
                  </p>
                  <PieChart series={[{ data: brett_data, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>{11.17} %</PieCenterLabel>
                  </PieChart>
                </div>
              </div>
            </div>
            <div className='w-[416px] '>
              <p className='text-center text-2xl'>
                Overlap of Top Holders: {268}
              </p>
              <br />
              <div className='flex'>
                <div className='w-52'>
                  <p className='text-center text-xl'>
                    WOLF
                  </p>
                  <PieChart series={[{ data: wolf_data, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>{3.53} %</PieCenterLabel>
                  </PieChart>
                </div>

                <div className='w-52'>
                  <p className='text-center text-xl'>
                    BRETT
                  </p>
                  <PieChart series={[{ data: brett_data, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>{11.17} %</PieCenterLabel>
                  </PieChart>
                </div>
              </div>
            </div>
            <div className='w-[416px] '>
              <p className='text-center text-2xl'>
                Overlap of Top Holders: {268}
              </p>
              <br />
              <div className='flex'>
                <div className='w-52'>
                  <p className='text-center text-xl'>
                    WOLF
                  </p>
                  <PieChart series={[{ data: wolf_data, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>{3.53} %</PieCenterLabel>
                  </PieChart>
                </div>

                <div className='w-52'>
                  <p className='text-center text-xl'>
                    BRETT
                  </p>
                  <PieChart series={[{ data: brett_data, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>{11.17} %</PieCenterLabel>
                  </PieChart>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-6'>
            <div className="relative">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                      Indicators
                    </th>
                    <th scope="col" className="px-6 py-3">
                      WOLF
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                      BRETT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Holders
                    </th>
                    <td className="px-6 py-4">
                      9000
                    </td>
                    <td className="px-6 py-4">
                      4500
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Holders Overlap
                    </th>
                    <td className="px-6 py-4">
                      900 (25%)
                    </td>
                    <td className="px-6 py-4">
                      900 (40%)
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Average Acquisition Cost
                    </th>
                    <td className="px-6 py-4">
                      $5,000
                    </td>
                    <td className="px-6 py-4">
                      $3,000
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Token Inflow
                    </th>
                    <td className="px-6 py-4">
                      500,000
                    </td>
                    <td className="px-6 py-4">
                      300,000
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Token Outflow
                    </th>
                    <td className="px-6 py-4">
                      500,000
                    </td>
                    <td className="px-6 py-4">
                      300,000
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      HODL vs Trade
                    </th>
                    <td className="px-6 py-4">
                      HODL
                    </td>
                    <td className="px-6 py-4">
                      Trade
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      WOLF to BRETT Swap
                    </th>
                    <td className="px-6 py-4">
                      1,500,000
                    </td>
                    <td className="px-6 py-4">
                      0
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      BRETT to WOLF Swap
                    </th>
                    <td className="px-6 py-4">
                      0
                    </td>
                    <td className="px-6 py-4">
                      13,500,000
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Transaction Frequency
                    </th>
                    <td className="px-6 py-4">
                      5 per month
                    </td>
                    <td className="px-6 py-4">
                      3 per month
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Top Purchase Sources
                    </th>
                    <td className="px-6 py-4">
                      Exchange A1, Exchange A2, Exchange A3
                    </td>
                    <td className="px-6 py-4">
                      Exchange B1, Exchange B2, Exchange B3
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Common Purchase Source
                    </th>
                    <td className="px-6 py-4">
                      Exchange C
                    </td>
                    <td className="px-6 py-4">
                      Exchange C
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Commonly Held Tokens
                    </th>
                    <td className="px-6 py-4">
                      Token X, Token Y
                    </td>
                    <td className="px-6 py-4">
                      Token X, Token Y
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Overall Activity Level
                    </th>
                    <td className="px-6 py-4">
                      50 tx per month
                    </td>
                    <td className="px-6 py-4">
                      50 tx per month
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Gains/Losses
                    </th>
                    <td className="px-6 py-4">
                      + 25%
                    </td>
                    <td className="px-6 py-4">
                      - 18%
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Flow Patterns (Inflow)
                    </th>
                    <td className="px-6 py-4">
                      60%
                    </td>
                    <td className="px-6 py-4">
                      55%
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Flow Patterns (Outflow)
                    </th>
                    <td className="px-6 py-4">
                      40%
                    </td>
                    <td className="px-6 py-4">
                      45%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-span-3 mx-auto'>
            <div>
              <p className='text-center text-2xl'>
                Overlap of Top Holders: {268}
              </p>
              <LineChart
                width={450}
                height={250}
                series={[
                  { data: pData, label: 'WOLF' },
                  { data: uData, label: 'BRETT' },
                ]}
                xAxis={[{
                  scaleType: 'point',
                  data: xLabels,
                  fill: 'white',
                  tickLabelStyle: {
                    fill: 'white'
                  }
                }]}
                yAxis={[{
                  tickLabelStyle: {
                    fill: 'white'
                  }
                }]}
                sx={{
                  '.MuiChartsLegend-series text tspan': {
                    fill: 'white',
                  },
                  '.MuiChartsAxis-line': {
                    stroke: "white !important"
                  }
                }}
              />
            </div>

            <div>
              <p className='text-center text-2xl'>
                Overlap of Top Holders: {268}
              </p>
              <LineChart
                width={450}
                height={250}
                series={[
                  { data: pData, label: 'WOLF' },
                  { data: uData, label: 'BRETT' },
                ]}
                xAxis={[{
                  scaleType: 'point',
                  data: xLabels,
                  fill: 'white',
                  tickLabelStyle: {
                    fill: 'white'
                  }
                }]}
                yAxis={[{
                  tickLabelStyle: {
                    fill: 'white'
                  }
                }]}
                sx={{
                  '.MuiChartsLegend-series text tspan': {
                    fill: 'white',
                  },
                  '.MuiChartsAxis-line': {
                    stroke: "white !important"
                  }
                }}
              />
            </div>

            <div>
              <p className='text-center text-2xl'>
                Overlap of Top Holders: {268}
              </p>
              <LineChart
                width={450}
                height={250}
                series={[
                  { data: pData, label: 'WOLF' },
                  { data: uData, label: 'BRETT' },
                ]}
                xAxis={[{
                  scaleType: 'point',
                  data: xLabels,
                  fill: 'white',
                  tickLabelStyle: {
                    fill: 'white'
                  }
                }]}
                yAxis={[{
                  tickLabelStyle: {
                    fill: 'white'
                  }
                }]}
                sx={{
                  '.MuiChartsLegend-series text tspan': {
                    fill: 'white',
                  },
                  '.MuiChartsAxis-line': {
                    stroke: "white !important"
                  }
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}