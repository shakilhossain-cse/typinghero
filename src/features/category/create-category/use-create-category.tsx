import { api } from "@/utils/api";

export const useCreateCategory = (onCreate: () => void) => {
  const utils = api.useContext();
  const mutation = api.category.create.useMutation({
    onMutate: async () => {
      await utils.category.getAll.cancel();
      onCreate();
    },
    onSettled: async () => {
      await utils.category.getAll.invalidate();
    },
  });
  return { mutation };
};

