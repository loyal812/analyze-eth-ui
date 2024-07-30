import React, { useState } from 'react';
import { TextField, Button, Input } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDispatch } from 'react-redux';
import { getAnalyze, getWalletAnalyze } from '../../redux/analyzeReducer';

export default function Analyze() {
  const dispatch = useDispatch();

  const [token_address1, setTokenAddress1] = useState("0x66bFf695f3B16a824869a8018a3A6e3685241269")
  const [token_address2, setTokenAddress2] = useState("0x67466BE17df832165F8C80a5A120CCc652bD7E69")
  const [holder1, setHolder1] = useState([])
  const [holder2, setHolder2] = useState([])
  const [cross_list, setCrossList] = useState([])

  const overlap_holder_data = [
    { value: 722, label: 'Only WOLF Holders', color: '#9001CB' }, //, color: '#610094'
    { value: 268, label: 'Overlap Holders', color: '#DA00FF' }
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

  const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
      color: 'white', 
    },
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  const analyze = async () => {
    console.log(token_address1)
    console.log(token_address2)

    let result = await dispatch(getAnalyze(token_address1, token_address2))
    
    setHolder1(result[0])
    setHolder2(result[1])
    setCrossList(result[2])
    console.log("analyze result: ", result)
  }

  const analyzeWalletAddress = async (wallet_address) => {
    console.log(wallet_address)

    let result = await dispatch(getWalletAnalyze(wallet_address))

    console.log(result)
  }

  return (
    <div className='bg-slate-950 w-full p-8 min-h-[100vh] text-white space-y-8'>
      <div className='grid grid-cols-12'>
        <div className='col-span-5'>
          <div className='flex'>
            <p>Token address 1</p>
            <CustomTextField 
              value={token_address1}
              onChange={(e) => setTokenAddress1(e.target.value)}
              variant="standard" 
              focused 
              className="w-full"
              defaultValue="0x66bFf695f3B16a824869a8018a3A6e3685241269" />
          </div>
        </div>
        <div className='col-span-2 text-center'>
          <Button 
            onClick={() => analyze()}
            color='secondary' 
            variant="outlined">
              Analyze
          </Button>
        </div>
        <div className='col-span-5'>
          <div className='flex'>
            <p>Token address 2</p>
            <CustomTextField 
              value={token_address2}
              onChange={(e) => setTokenAddress2(e.target.value)}
              variant="standard" 
              focused 
              className='w-full'
              defaultValue="0x67466BE17df832165F8C80a5A120CCc652bD7E69" />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-12'>
        <div className='col-span-5 space-y-8'>
          <p className='font-bold text-2xl text-center'>Token 1 Top 1000 Holder list</p>
          <div className='overflow-x-auto max-h-96'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Wallet Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Balance
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    USD value
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Percentage
                  </th> */}
                </tr>
              </thead>
              <tbody className=''>
                {
                  holder1 && holder1.map(data => (
                    <tr className="bg-white dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {data.owner_address}
                      </th>
                      <td className="px-6 py-4">
                        {data.owner_balance}
                      </td>
                      {/* <td className="px-6 py-4">
                        {data.owner_usd_value}
                      </td>
                      <td className="px-6 py-4">
                        {data.owner_percentage_relative_to_total_supply}
                      </td> */}
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className='col-span-2 text-center'>
          <div className=''>
            <p className='text-center text-2xl'>
              Crossover List: {cross_list.length}
            </p>
            <br />
            <div className='flex'>
              <div className='ml-[55px]'>
                <PieChart series={[{ data: overlap_holder_data, innerRadius: 55 }]} {...size} slotProps={{
                  legend: { hidden: true },
                }}>
                  <PieCenterLabel>{cross_list.length / holder1.length * 100} %</PieCenterLabel>
                </PieChart>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-5  space-y-8'>
          <p className='font-bold text-2xl text-center'>Token 2 Top 1000 Holder list</p>
          <div className='overflow-x-auto max-h-96'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Wallet Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Balance
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                    USD value
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Percentage
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {
                  holder2 && holder2.map(data => (
                    <tr className="bg-white dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {data.owner_address}
                      </th>
                      <td className="px-6 py-4">
                        {data.owner_balance}
                      </td>
                      {/* <td className="px-6 py-4">
                        {data.owner_usd_value}
                      </td>
                      <td className="px-6 py-4">
                        {data.owner_percentage_relative_to_total_supply}
                      </td> */}
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-12'>
          <div className='col-span-5 space-y-8'>
            <p className='font-bold text-2xl text-center'>Crossovered holder list</p>
            <div className='overflow-x-auto max-h-96'>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center rounded-lg">
                      Wallet Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cross_list && cross_list.map(data => (
                      <tr className="bg-white dark:bg-gray-800">
                        <th 
                          scope="row" 
                          className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white hover:bg-gray-300"
                          onClick={() => analyzeWalletAddress(data)}
                        >
                          {data}
                        </th>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-span-2'>

          </div>
          <div className='col-span-5'>
              
          </div>
      </div>
    </div>
  );
}
