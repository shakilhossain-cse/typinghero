import { type Option, Select } from "@/ui-kit/select";
import { api } from "@/utils/api";
import { useState } from "react";

export const SelectCategory = () => {
  const categories = api.category.getAll.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<Option>({
    label: "unknown category",
    id: NaN,
  });
  const { label, id } = selectedCategory;
  return (
    <Select
      value={{ label, id }}
      onSelect={(item) => {
        setSelectedCategory(item);
      }}
      renderOption={(label) => {
        return (
          <span className="flex w-full items-center justify-between">
            <span className="mr-2">{label}</span>
          </span>
        );
      }}
      options={
        (categories?.data || []).map((ele) => ({
          label: ele.name,
          id: parseInt(ele.id),
        })) as Option[]
      }
    />
  );
};
