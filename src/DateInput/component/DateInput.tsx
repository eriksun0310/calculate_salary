import React, { useContext, useEffect, useState } from "react";
import { TimePicker, DatePicker, Input } from "antd";
import { RangeValue } from "rc-picker/es/interface";
import dayjs from "dayjs";
import { DataContext } from "../../App";

//日期、時間選擇器 格式
const format = "HH:mm";
const weekFormat = "MM/DD";

interface PropsType {
    // className:string
    value: string;
    getValue: (v: string) => void;
    getTotalMin?: (v: {[key:string]:number}, filterFlag?:boolean) => void;
}

const DateInput = ({ 
    value, 
    getValue = () => {},  
    getTotalMin = () => {} 
}: PropsType) => {

    const data = useContext(DataContext)


    // 紀錄每一筆的總分鐘 {id: min}
    const [totalMin, setTotalMin] = useState<{[key:string]:number}>({});
    // 是否有點擊trash
    const [clicked, setClicked] = useState(false);



    // 時間選擇器事件
    const onChange = (
        time: RangeValue<dayjs.Dayjs>,
        dateString: [string, string]
    ): void => {
        const startHour = time?.[0]?.hour() ?? 0;
        const endHour = time?.[1]?.hour() ?? 0;

        const startMin = time?.[0]?.minute() ?? 0;
        const endMin = time?.[1]?.minute() ?? 0;

        const calculateMin = (endHour - startHour) * 60 + (endMin - startMin);
        setTotalMin((prev) => ({ 
            ...prev, 
            [value]: calculateMin
        }));
    };

    // 點trash Btn 事件
    const deleteDate = () => {
        setClicked(true);
        if (value) {
            getValue(value);
        }
        if(totalMin[value] > 0) getTotalMin(totalMin, true)
    };

    // 有點擊 trash Btn 送去父層filter
    useEffect(() => {
        if (clicked) {
            getValue(value);
        }
    }, []);


    // 總分鐘 送去父層 塞回array
    useEffect(()=>{
        if(totalMin[value] > 0){
            getTotalMin(totalMin)
        }
    }, [totalMin])

    return (
        <div className="dateInput" id={value}>
            <div>
                <DatePicker format={weekFormat} inputReadOnly />
            </div>
            <div>
                <TimePicker.RangePicker
                inputReadOnly
                onChange={onChange}
                format={format}
                />
            </div>
            <div>
                <div className="inputTitle">總分鐘</div>
                <Input 
                value={totalMin?.[value]}
                // 防止input的輸入
                onFocus={(e)=> e.target.blur()}
                /> 
                 
            </div>
            <div>
                <div className="inputTitle">案主</div>
                <Input placeholder="請輸入案主" />
            </div>
            <div>
                <i
                className="bi bi-trash"
                onClick={() => {
                    deleteDate();
                }}
                ></i>
            </div>
        </div>
    );
};
export default DateInput;
