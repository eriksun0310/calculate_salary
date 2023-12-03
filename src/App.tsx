import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Index as BasicInput } from "./BasicInput/Index";
import { Index as DateInput } from "./DateInput/Index";
import { Index as TotalSalary } from "./TotalSalary/Index";
import { Divider, Button } from "antd";


interface DataContextProps{
    health: number
    hourlyRate: number
    labor: number
    month: number
    submitFlag: boolean
    totalMin: number
}

// 1. 先createContext
export const DataContext = createContext<DataContextProps>({
    health: 0,
    hourlyRate: 0,
    labor: 0,
    month: 0,
    submitFlag: false,
    totalMin: 0
});

const App = () => {
  const [providerValue, setProviderValue] = useState({
    health: 0,
    hourlyRate: 0,
    labor: 0,
    month: 0,
    submitFlag: false,
    totalMin: 0
  });

  // 點擊 送出時 將scroll滾到 totalSalary
  useEffect(() => {
    document.getElementById('totalSalary')?.scrollIntoView({ behavior: 'smooth' });
  }, [providerValue?.submitFlag])
  return (
    <DataContext.Provider value={providerValue}>
      <h4 className="title mt-2">計算照服員薪資</h4>
      <BasicInput
        getValue={(v) =>{
          setProviderValue((prev) => ({
            ...prev,
            ...v,
          }))
        }}
      />
      <DateInput
        getValue={(v)=>{
          setProviderValue((prev)=>({
            ...prev,
            totalMin:v
          }))
        }}
       />
      <div className="submitBtn mt-3">
        <Button
          onClick={() => {
            setProviderValue((prev) => ({
              ...prev,
              submitFlag: true,
            }));
          }}
        >
          送出
        </Button>
      </div>
      <Divider />
      <div id="totalSalary">
        <TotalSalary />
      </div>
    </DataContext.Provider>
  );
};
export default App;
