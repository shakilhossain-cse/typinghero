import { useIsAuthed } from "@/features/user";
import Image from "next/image";
import { useCallback, useState } from "react";
import { CategoryPopup } from "../category-popup";

export const CreateCategory = () => {
    const isAuthed = useIsAuthed();
    const [isOpenedPopup, setIsOpenedPopup] = useState(false);
  
    const onClose = useCallback(() => {
      setIsOpenedPopup(false);
    }, []);
  
    if (!isAuthed) return null;
  
    return (
      <div>
        <div
          onClick={() => setIsOpenedPopup(true)}
          className="ml-2 flex h-12 w-12 cursor-pointer
                select-none items-center justify-center
                 rounded border border-gray-300 bg-white  hover:border-gray-400"
        >
          <Image src={"/img/add.svg"} alt={"add"} width={20} height={20} />
        </div>
        <CategoryPopup
          onClose={onClose}
          isOpened={isOpenedPopup}
          categoryId={null}
        />
      </div>
    );
  };