import { Popup } from "@/ui-kit";
import React, { useState } from "react";
import { useCreateCategory } from "./use-create-category";

interface CreateCategoryPopupProps {
  isOpened: boolean;
  onClose: () => void;
}

export const CreateCategoryPopup: React.FC<CreateCategoryPopupProps> = ({
  isOpened,
  onClose,
}) => {
  const [name, setName] = useState("");

  const { mutation } = useCreateCategory(onClose);
  return (
    <Popup onClose={onClose} isOpened={isOpened}>
      <div className="popup-box">
        <div className="mb-6 flex items-center">
          <h2 className="text-3xl">Add New Category</h2>
        </div>
        <input
          type="text"
          value={name}
          placeholder="name"
          className="input-primary"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          disabled={!name}
          onClick={() => {
            setName("");
            mutation.mutate({ name });
          }}
          className="button-outline"
        >
          Add
        </button>
      </div>
    </Popup>
  );
};
