import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

export default function Dashboard() {
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

  return (
    <div className='bg-black w-full h-[100vh] text-white'>
      <div>
        <h1 className='text-center text-3xl font-bold p-2'>BRETT & WOLF Analyze Result</h1>

        <div className='w-[416px]'>
          <p className='text-center text-2xl'>
            Overlap of Top Holders
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
    </div>
  );
}
