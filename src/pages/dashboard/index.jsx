import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { getAnalyzeOverview } from '../../redux/analyzeReducer';
import { openSnackBar } from '../../redux/snackBarReducer';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/globalReducer';

export default function Dashboard() {
  const dispatch = useDispatch();

  const [analyzeData, setAnalyzeData] = useState({})

  const [wolfDailyData, setWolfDailyData] = useState([])
  const [brettDailyData, setBrettDailyData] = useState([])
  const [xWolfDailyLabels, setXWolfDailyLabels] = useState([])

  const [wolfWeeklyData, setWolfWeeklyData] = useState([])
  const [brettWeeklyData, setBrettWeeklyData] = useState([])
  const [xWolfWeeklyLabels, setXWolfWeeklyLabels] = useState([])
  const [xBrettWeeklyLabels, setXBrettWeeklyLabels] = useState([])

  const [wolfMonthlyData, setWolfMonthlyData] = useState([])
  const [brettMonthlyData, setBrettMonthlyData] = useState([])
  const [xWolfMonthlyLabels, setXWolfMonthlyLabels] = useState([])

  // Line Chart Data
  // console.log("daily: ", analyzeData.brett_tx_daily_freq)
  // const wolfDailyData = analyzeData.wolf_tx_daily_freq.map(item => item.count)
  // const brettDailyData = analyzeData.brett_tx_daily_freq.map(item => item.count)
  // const xWolfDailyLabels = analyzeData.wolf_tx_daily_freq.map(item => item.date)

  // console.log("weekly: ", analyzeData.brett_tx_weekly_freq)
  // const wolfWeeklyData = analyzeData.wolf_tx_weekly_freq.map(item => item.count)
  // const brettWeeklyData = analyzeData.brett_tx_weekly_freq.map(item => item.count)
  // const xWolfWeeklyLabels = analyzeData.wolf_tx_weekly_freq.map(item => item.week)

  // console.log("weekly: ", analyzeData.brett_tx_weekly_freq)
  // const brettWeeklyData = analyzeData.brett_tx_weekly_freq.map(item => item.count)
  // const xBrettWeeklyLabels = analyzeData.brett_tx_weekly_freq.map(item => item.week)

  // console.log("monthly: ", analyzeData.brett_tx_monthly_freq)
  // const wolfMonthlyData = analyzeData.wolf_tx_monthly_freq.map(item => item.count)
  // const brettMonthlyData = analyzeData.brett_tx_monthly_freq.map(item => item.count)
  // const xWolfMonthlyLabels = analyzeData.wolf_tx_monthly_freq.map(item => item.month)

  useEffect(() => {
    (async () => {
      try {
        dispatch(setLoading(true));
        let res = await dispatch(getAnalyzeOverview());
        console.log("analyzed overview:", res)
        setAnalyzeData(res)


        setWolfDailyData(res.wolf_tx_daily_freq.map(item => item.count))
        setBrettDailyData(res.brett_tx_daily_freq.map(item => item.count))
        setXWolfDailyLabels(res.wolf_tx_daily_freq.map(item => item.date))

        setWolfWeeklyData(res.wolf_tx_weekly_freq.map(item => item.count))
        setXWolfWeeklyLabels(res.wolf_tx_weekly_freq.map(item => item.week))

        setBrettWeeklyData(res.brett_tx_weekly_freq.map(item => item.count))
        setXBrettWeeklyLabels(res.brett_tx_weekly_freq.map(item => item.week))
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(openSnackBar({ status: "error", message: "Error occured fetching data" }))
        // console.log('Error occured when fetching data.');
      }
    })();
  }, []);

  // Pie Chart Data
  const wolf_overlap_holder_data = [
    { value: 722, label: 'Only WOLF Holders', color: '#9001CB' }, //, color: '#610094'
    { value: 268, label: 'Overlap Holders', color: '#DA00FF' }
  ];

  const wolf_investment_behavior_data = [
    { value: analyzeData.wolf_incomes, label: 'Inflow', color: '#9001CB' }, //, color: '#610094'
    { value: analyzeData.wolf_outgoings, label: 'Outflow', color: '#DA00FF' },
  ];

  const wolf_gain_loss = [
    { value: 1000, label: 'Net', color: '#9001CB' }, //, color: '#610094'
    { value: 0, label: 'Gain/Loss', color: '#DA00FF' },
  ];

  const brett_overlap_holder_data = [
    { value: 722, label: 'Only BRETT Holders', color: '#02B2AF' }, //, color: '#610094'
    { value: 268, label: 'Overlap Holders', color: '#72CCFF' }
  ];

  const brett_investment_behavior_data = [
    { value: analyzeData.brett_incomes, label: 'Inflow', color: '#02B2AF' }, //, color: '#610094'
    { value: analyzeData.brett_outgoings, label: 'Outflow', color: '#72CCFF' }
  ];

  const brett_gain_loss = [
    { value: 1000, label: 'Net', color: '#02B2AF' }, //, color: '#610094'
    { value: 0.00001, label: 'Gain/Loss', color: '#72CCFF' },
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

  return (
    <div className='bg-slate-950 w-full min-h-[100vh] text-white'>
      <div>
        <h1 className='text-center text-3xl font-bold p-2'>Top 1000 BRETT & WOLF Holders Analyze Result</h1>

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
                  <PieChart series={[{ data: wolf_overlap_holder_data, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>{26.8} %</PieCenterLabel>
                  </PieChart>
                </div>

                <div className='w-52'>
                  <p className='text-center text-xl'>
                    BRETT
                  </p>
                  <PieChart series={[{ data: brett_overlap_holder_data, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>{26.8} %</PieCenterLabel>
                  </PieChart>
                </div>
              </div>
            </div>
            <div className='w-[416px] '>
              <p className='text-center text-2xl'>
                Investment Behavior:
              </p>
              <br />
              <div className='flex'>
                <div className='w-52'>
                  <p className='text-center text-xl'>
                    WOLF
                  </p>
                  <PieChart series={[{ data: wolf_investment_behavior_data, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>{(analyzeData.wolf_incomes / analyzeData.wolf_tokens * 100).toFixed(2)} %</PieCenterLabel>
                  </PieChart>
                </div>

                <div className='w-52'>
                  <p className='text-center text-xl'>
                    BRETT
                  </p>
                  <PieChart series={[{ data: brett_investment_behavior_data, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>{(analyzeData.brett_incomes / analyzeData.brett_tokens * 100).toFixed(2)} %</PieCenterLabel>
                  </PieChart>
                </div>
              </div>
            </div>
            <div className='w-[416px] '>
              <p className='text-center text-2xl'>
                Gains/Losses:
              </p>
              <br />
              <div className='flex'>
                <div className='w-52'>
                  <p className='text-center text-xl'>
                    WOLF
                  </p>
                  <PieChart series={[{ data: wolf_gain_loss, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>{0} %</PieCenterLabel>
                  </PieChart>
                </div>

                <div className='w-52'>
                  <p className='text-center text-xl'>
                    BRETT
                  </p>
                  <PieChart series={[{ data: brett_gain_loss, innerRadius: 55 }]} {...size} slotProps={{
                    legend: { hidden: true },
                  }}>
                    <PieCenterLabel>1.9e-14 %</PieCenterLabel>
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
                      1000
                    </td>
                    <td className="px-6 py-4">
                      1000
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Holders Overlap
                    </th>
                    <td className="px-6 py-4">
                      268 (26.8%)
                    </td>
                    <td className="px-6 py-4">
                      268 (26.8%)
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Average Acquisition Cost
                    </th>
                    <td className="px-6 py-4">
                      ${analyzeData.wolf_tokens}
                    </td>
                    <td className="px-6 py-4">
                      ${analyzeData.brett_tokens}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Token Inflow
                    </th>
                    <td className="px-6 py-4">
                      ${analyzeData.wolf_incomes} ({analyzeData.wolf_incomes / analyzeData.wolf_tokens * 100} %)
                    </td>
                    <td className="px-6 py-4">
                      ${analyzeData.brett_incomes} ({analyzeData.brett_incomes / analyzeData.brett_tokens * 100} %)
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Token Outflow
                    </th>
                    <td className="px-6 py-4">
                      ${analyzeData.wolf_outgoings} ({analyzeData.wolf_outgoings / analyzeData.wolf_tokens * 100} %)
                    </td>
                    <td className="px-6 py-4">
                      ${analyzeData.brett_outgoings} ({analyzeData.brett_outgoings / analyzeData.brett_tokens * 100} %)
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
                      HODL
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      WOLF to BRETT Swap
                    </th>
                    <td className="px-6 py-4">
                      3249451806.0870805
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
                      16795256155.359762
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Overall Activity Level
                    </th>
                    <td className="px-6 py-4">
                      {analyzeData.wolf_tx_total_avg}
                    </td>
                    <td className="px-6 py-4">
                      {analyzeData.brett_tx_total_avg}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Transaction Frequency
                    </th>
                    <td className="px-6 py-4">
                      {analyzeData.wolf_tx_monthly_avg} tx per month
                    </td>
                    <td className="px-6 py-4">
                      {analyzeData.brett_tx_monthly_avg} tx per month
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Top Purchase Sources
                    </th>
                    <td className="px-6 py-4">
                      Uniswap: Universal Router, MEV Bot, Exchange Proxy Flash Wallet, 1inch v5
                    </td>
                    <td className="px-6 py-4">
                      Uniswap: Universal Router, MEV Bot, Exchange Proxy Flash Wallet, coakie.eth
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Common Purchase Source
                    </th>
                    <td className="px-6 py-4">
                      Uniswap: Universal Router, MEV Bot, Exchange Proxy Flash Wallet
                    </td>
                    <td className="px-6 py-4">
                      Uniswap: Universal Router, MEV Bot, Exchange Proxy Flash Wallet
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Commonly Held Tokens
                    </th>
                    <td className="px-6 py-4">
                      INUNOMICS, ANDY, PEIPEIEW
                    </td>
                    <td className="px-6 py-4">
                      INUNOMICS, ANDY, PEIPEIEW
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Gains/Losses
                    </th>
                    <td className="px-6 py-4">
                      0.0%
                    </td>
                    <td className="px-6 py-4">
                      1.968504565219422e-14%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-span-3 mx-auto'>
            <div>
              <p className='text-center text-2xl'>
                Daily Transaction Frequency:
              </p>
              <LineChart
                width={450}
                height={250}
                series={[
                  { data: wolfDailyData, label: 'WOLF' },
                  { data: brettDailyData, label: 'BRETT' },
                ]}
                xAxis={[{
                  scaleType: 'point',
                  data: xWolfDailyLabels,
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
                WOLF Weekly Transaction Frequency:
              </p>
              <LineChart
                width={450}
                height={250}
                series={[
                  { data: wolfWeeklyData, label: 'WOLF' },
                  // { data: wolfWeeklyData, label: 'BRETT' },
                ]}
                xAxis={[{
                  scaleType: 'point',
                  data: xWolfWeeklyLabels,
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
                BRETT Weekly Transaction Frequency:
              </p>
              <LineChart
                width={450}
                height={250}
                series={[
                  // { data: brettMonthlyData, label: 'WOLF' },
                  { data: brettWeeklyData, label: 'BRETT' },
                ]}
                xAxis={[{
                  scaleType: 'point',
                  data: xBrettWeeklyLabels,
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