import { api } from "@/utils/api";

export const useCategoryMutations = (onSettled: () => void = () => null) => {
  const utils = api.useContext();
  const createMutation = api.category.create.useMutation({
    onSettled: async () => {
      await utils.category.getAll.invalidate();
      await utils.category.getSelected.invalidate();
      onSettled();
    },
  });
  const updateMutation = api.category.update.useMutation({
    onSettled: async () => {
      await utils.category.getAll.invalidate();
      await utils.category.getSelected.invalidate();
      onSettled();
    },
  });
  const selectMutation = api.category.select.useMutation({
    onSettled: async () => {
      await utils.category.getSelected.invalidate();
    },
  });
  const deleteMutation = api.category.delete.useMutation({
    onSettled: async () => {
      await utils.category.getAll.refetch();
      await utils.category.getSelected.invalidate();
      onSettled();
    },
  });
  return { createMutation, updateMutation, selectMutation, deleteMutation };
};
