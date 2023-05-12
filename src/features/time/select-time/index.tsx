import { Popup, Select } from "@/ui-kit";
import Image from "next/image";
import React, { useState } from "react";
interface ITimesData {
  id: string;
  label: string;
}

export function SelectTime() {
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState<ITimesData>({
    label: "",
    id: "",
  });

  const times: ITimesData[] = [
    { id: "1", label: "1m" },
    { id: "2", label: "2m" },
    { id: "3", label: "5m" },
    { id: "4", label: "10m" },
  ];
  const selectItem = (item: ITimesData) => {
    setSelectedTime(item);
  };
  return (
    <div>
      {/* <div
        onClick={() => setIsOpenedPopup(true)}
        className="flex h-12 w-12 cursor-pointer
          select-none items-center justify-center
           rounded border border-gray-300 bg-white  hover:border-gray-400"
      >
        <Image src={"/img/clock.svg"} alt={"add"} width={20} height={20} />
      </div> */}

      <Select
        icon="/img/clock.svg"
        value={{ label: selectedTime.label, id: selectedTime.id }}
        onSelect={selectItem}
        renderOption={(label, id) => {
          return (
            <span className={"flex w-full items-center justify-between"}>
              <span className={"mr-2"}>{label}</span>
            </span>
          );
        }}
        options={
          times?.map((el) => ({
            label: el.label,
            id: el.id,
          })) || []
        }
      />
    </div>
  );
}
