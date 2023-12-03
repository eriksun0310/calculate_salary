import React, { useContext } from "react";
import { DataContext } from "../App";

const Index = (): JSX.Element => {
    const data = useContext(DataContext);
    // 時薪
    const hourlyRate =  data?.hourlyRate
    // 總分鍾
    const totalMin =  data?.totalMin
    // 總時數
    const totalHour = totalMin > 0  
    ? (totalMin /60).toFixed(2)
    : 0


    // 計算總薪資
    const calculateTotalMoney = ()=>{
        // 1 分鐘的錢 
        const minMoney = parseFloat((hourlyRate / 60).toFixed(2)) ?? 0

        // 總金額  = (總分鐘 ＊ 1分鐘的錢) - (健保 ＋ 勞保)
        const totalMoney = Math.round(totalMin * minMoney) - (data?.health +  data?.labor)
        return totalMoney
    }

    const totalMoney = 
    (totalMin > 0  &&  hourlyRate > 0 ) 
    ? calculateTotalMoney()  
    : 0

 

    return (
        <div className="d-flex justify-content-center">
            {
                data?.submitFlag && (
                    <div className="totalSalary">
                        <table cellPadding={10}>
                            <tbody>
                                <tr>
                                    {
                                        data?.month > 0 && (
                                            <td colSpan={2} style={{ textAlign: "center" }}>
                                            {data?.month}月份 薪資單
                                            </td>
                                        )
                                    }
                                </tr>
                                <tr>
                                    {
                                        data?.totalMin > 0 && (
                                            <>
                                                <td>總時數：</td>
                                                <td>{totalHour}小時</td>
                                            </>
                                        )
                                    }
                                </tr>
                                <tr>
                                    {
                                        data?.labor > 0 && (
                                            <>
                                                <td>勞保費：</td>
                                                <td>${data?.labor}</td>
                                            </>
                                        )
                                    }
                                </tr>
                                {
                                    data?.health > 0 && (
                                        <tr>
                                            <td>健保費：</td>
                                            <td>${data?.health}</td>
                                        </tr>
                                    )
                                }
                                {
                                    (totalMin > 0  &&  hourlyRate > 0) &&(
                                        <tr style={{ backgroundColor: "#B3F4C1" }}>
                                            <td>本月實領薪資：</td>
                                            <td>${totalMoney}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }

        </div>
    );
};

export { Index };
