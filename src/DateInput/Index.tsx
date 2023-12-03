import React, { useEffect, useState } from "react";
import DateInput from "./component/DateInput";
import { v4  } from 'uuid'
import { Divider } from 'antd'


interface DateObject {
    id:string
}
interface indexProps {
    getValue :(v:number) =>void
}

const Index = ({
    getValue=() =>{}
}:indexProps):JSX.Element => {
    // 每一筆的 DateInput 的data
    const [date, setDate] = useState<DateObject[]>([{ id: v4()}])


    // 每一筆DateInput紀錄的總時間  [{id: min}, {id: min}]
    const [totalMinArr, setTotalMinArr] = useState<{ [key: string]: number }[]>([]);
    

     // 處理 dateInput 增加事件 + add 動畫效果
    const addDate = ()=>{
        const id = v4()
        //確保在瀏覽器進行下一次重新繪製之執行
        requestAnimationFrame(()=>{
            //函數中的第一個操作，這確保了 DOM 操作在下一次瀏覽器重新繪製之前執行。
            setDate((prev)=>[...prev, {id:id}])
    
            // setTimeout內的代碼將在下一個瀏覽器 frame 中執行，這就是 DOM 已經更新並能夠正確訪問的時候。
            setTimeout(()=>{
                const dateInput = document.getElementById(id)
                if(dateInput){
                    dateInput.classList.add("addAnimation")
                }
            }, 0)
        
            // 函數中的第一個操作，這確保了 DOM 操作在下一次瀏覽器重新繪製之前執行。
            setTimeout(()=>{
                const dateInput = document.getElementById(id)
                if(dateInput){
                    dateInput.classList.remove("addAnimation")
                }
            }, 500)
        })
    }

    // 處理 dateInput 移除事件 + remove 動畫效果
    const removeDate = (v:string) => {
        console.log('v ',v)
        const dateInput = document.getElementById(`${v}`);
        
        // 添加動畫類
        dateInput?.classList.add("removeAnimation");
        // 確保動畫完成後再執行移除, 已避免發生dateInput閃爍的問題
        setTimeout(()=>{
            dateInput?.classList.remove("removeAnimation")
            setDate(date?.filter((i) => i.id !== v));
        },500)



        // 這樣寫法會造成, 動畫完成後,dateInput 閃爍的問題
        // 監聽動畫结束事件
        // dateInput?.addEventListener("animationend", () => {
        //   // 移除動畫類
        //   dateInput.classList.remove("removeAnimation");
        // // 移除元素
        //   setDate(date?.filter((i) => i.id !== v));
        // }, { once: true }); // 僅監聽一次動畫束事件
    };



    // 計算總分鐘
    useEffect(()=>{
        let totalMin = 0
        totalMinArr?.map((i)=>{
            totalMin += Object.values(i)[0]
            return totalMin
        })
        getValue(totalMin)
    }, [totalMinArr])


    return (
        <>
            <Divider className="mb-3 mt-4" orientation="center" plain>
                上班時間
            </Divider>
            {
                date?.map((i)=>(
                    <DateInput  
                        key={i.id} 
                        value={i.id}
                        getValue={(v)=>{
                            if(v){
                                removeDate(v)
                            }
                        }}
                        getTotalMin={(v, trashFlag=false)=>{
                            const key = Object.keys(v)?.find((i)=>i)
                            const someKey = totalMinArr?.some((i) =>Object.keys(i)[0] === key)
                            if(trashFlag){
                                const filteredArr = totalMinArr?.filter((i)=> Object.keys(i)[0] !== key )
                                setTotalMinArr(filteredArr)
                            }else{
                                setTotalMinArr((prev) => {
                                    // totalMinArr 有存在一樣的key,把舊value, 更新成 新value
                                    if (someKey) {
                                        return prev.map((item) => (Object.keys(item)[0] === key ? v : item));
                                    } else {
                                        return [...prev, v];
                                    }
                                });
                            }
                        }}
                    />
                ))
            }
            <div>
                <i className="bi bi-plus-circle"  onClick = {addDate}/>
            </div>
        </>
        
    );
};
export { Index };
