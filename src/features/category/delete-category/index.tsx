import { useIsAuthed } from "@/features/user";
import { Popup } from "@/ui-kit";
import { useCallback, useState } from "react";
import { useCategoryMutations } from "../use-category-mutations";

interface CategoryDeletePopupProps {
  isOpened: boolean;
  categoryId: string | null;
  onClose: () => void;
  category: string | null;
}

export const RemoveCategoryPopup: React.FC<CategoryDeletePopupProps> = ({
  isOpened,
  categoryId,
  onClose,
  category,
}) => {
  const { deleteMutation } = useCategoryMutations();
  const confirmDelete = () => {
    {
      categoryId && deleteMutation.mutate({ categoryId });
      onClose();
    }
  };
  return (
    <Popup onClose={onClose} isOpened={isOpened}>
      <div className="popup-box">
        <div className="mb-6 flex items-center justify-center">
          <h2 className="text-xl ">
            Are you Sure to Remove{" "}
            <span className=" rounded bg-gray-100 px-4">{category}</span>{" "}
            Category
          </h2>
        </div>
        <div className="mx-auto my-12  flex w-1/3 justify-between">
          <button
            onClick={confirmDelete}
            className="border px-10 py-3 uppercase transition hover:bg-gray-200"
          >
            yes
          </button>

          <button
            onClick={onClose}
            className="border px-10 py-3 uppercase transition hover:bg-gray-200"
          >
            no
          </button>
        </div>
      </div>
    </Popup>
  );
};
