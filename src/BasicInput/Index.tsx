import React, { useEffect, useState } from "react";
import { Input, Divider } from "antd";
import Keyboard from "react-simple-keyboard";

interface indexProps{
  getValue:(v:object)=>void
}
interface valueProps{
  hourlyRate: number,
  month: number,
  labor:number,
  health: number,
}


const Index = ({
  getValue =()=>{}
}:indexProps) => {

  const [focusedInput, setFocusedInput] = useState<string| null>(null)
  // keyboard 輸入的value狀態
  const [inputValue, setInputValue] = useState<valueProps>({
    hourlyRate: 0,
    month: 0,
    labor:0,
    health: 0,
  })

  // 點擊 input 跳出的Keyboard
  const showKeyboard = (type:string)=>{
    setFocusedInput(type)
  }

  // 輸入Keyboard 後的事件
  const onChangeKeyboard = (v:number)=>{
    if(focusedInput){
      setInputValue((prev)=>({
        ...prev,
        [focusedInput]: v
      }))
    }
  }


  // 送去給父層的data
  useEffect(()=>{
    getValue(inputValue)
  },[inputValue])


  // 處理 點擊(非input + Keyboard以外的) side effect
  useEffect(()=>{
    const handleClickOutside = (event:MouseEvent) =>{
      // 點擊非input + Keyboard以外的(className: querySelector)
      if(!document.getElementById("basicInput")?.contains(event?.target as Node)
      && !document.querySelector(".react-simple-keyboard")?.contains(event?.target as Node)
      ){
        // 則隱藏 Keyboard
        setFocusedInput(null)
      }
    }

    // 在document 上添加點擊事件監聽
    document.addEventListener('click', handleClickOutside)

    // 組建卸載時, 清除事件監聽器
    return()=>{
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div>
        <Divider orientation="center" plain>
        基本資料
        </Divider>
        <div className="d-flex justify-content-center" id="basicInput">
          <div className="basicStyle">
            <div>
              <div className="inputTitle">時薪</div>
              <Input
                id="hourlyRate"
                value={inputValue?.hourlyRate}
                onClick={()=>showKeyboard("hourlyRate")}
                type="number"
                placeholder="請輸入時薪"
                // 隱藏 平板小鍵盤
                onFocus={(e)=> e.target.blur()}
              />
            </div>
            <div>
              <div className="inputTitle">工作月</div>
              <Input
              id="month"
              value={inputValue?.month}
              onClick={()=>showKeyboard("month")}
              type="number"
              placeholder="請輸入工作月"
              // 隱藏 平板小鍵盤
              onFocus={(e)=> e.target.blur()}
              />
            </div>
          </div>
          <div className="basicStyle">
            <div>
              <div className="inputTitle">勞保費</div>
              <Input
              id="labor"
              type="number"
              value={inputValue?.labor}
              onClick={()=>showKeyboard("labor")}
              placeholder="請輸入勞保費"
              onFocus={(e)=> e.target.blur()}
              />
            </div>
            <div>
              <div className="inputTitle">健保費</div>
              <Input
              id="health"
              type="number"
              value={inputValue?.health}
              onClick={()=>showKeyboard("health")}
              placeholder="請輸入健保費"
              onFocus={(e)=> e.target.blur()}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        id="keyboard"
        className={focusedInput 
          ? "d-flex justify-content-center mt-3"
          : "d-none"}
      >
          <Keyboard
            onChange={(v) =>  {
              onChangeKeyboard(parseInt(v, 10))
            }}
            // 已防先輸入的input value值會到下一個輸入的input value
            inputName={focusedInput ?? 'keyboard'}
            theme="hg-theme-default hg-layout-numeric numeric-theme"
            layout={{
              default: [
                '1 2 3', '4 5 6', '7 8 9', '0 {bksp}'
              ],
            }}
            display={{
              '{bksp}': '刪除'
            }}
          />
      </div>
    </>
  );
};
export { Index };
