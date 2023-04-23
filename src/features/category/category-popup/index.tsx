import { FragmentFrom } from "@/features/fragment/fragment-form";
import { Popup } from "@/ui-kit";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { useCategoryMutations } from "../use-category-mutations";

interface CategoryPopupProps {
  isOpened: boolean;
  categoryId: string | null;
  onClose: () => void;
}

export const CategoryPopup: React.FC<CategoryPopupProps> = ({
  isOpened,
  categoryId,
  onClose,
}) => {
  const categories = api.category.getAll.useQuery();
  const category = categories?.data?.find((el) => el.id === categoryId);
  const [name, setName] = useState("");
  const [fragments, setFragments] = useState<string[]>([]);
  useEffect(() => {
    setName(category?.name || "");
  }, [category?.name]);

  useEffect(() => {
    setFragments(
      (JSON.parse((category?.fragments as string) || "[]") as string[]) || []
    );
  }, [category?.fragments]);

  const { createMutation, updateMutation } = useCategoryMutations(onClose);
  return (
    <Popup onClose={onClose} isOpened={isOpened}>
      <div className="popup-box">
        <div className="mb-6 flex items-center">
          <h2 className="text-3xl">Add new Category</h2>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          className="input-primary"
        />
        {fragments.map((fragment, idx) => (
          <FragmentFrom
            key={idx}
            onDelete={() => {
              setFragments(fragments.filter((_, idxInner) => idxInner !== idx));
            }}
            value={fragment}
            onChange={(e) => {
              setFragments((fragments) =>
                fragments.map((fragmentInner, idxInner) =>
                  idxInner === idx ? e.target.value : fragmentInner
                )
              );
            }}
          />
        ))}

        <button
          onClick={() => {
            setFragments([...fragments, ""]);
          }}
          className="button-outline button-small block"
        >
          Add Fragment
        </button>
        <button
          disabled={!name}
          onClick={() => {
            if (typeof categoryId === "string" && category) {
              updateMutation.mutate({
                name,
                categoryId,
                fragments: JSON.stringify(fragments),
              });
            } else {
              createMutation.mutate({
                name,
                fragments: JSON.stringify(fragments),
              });
            }
            setName("");
            setFragments([]);
          }}
          className="button-outline mt-10"
        >
          Save Category
        </button>
      </div>
    </Popup>
  );
};
