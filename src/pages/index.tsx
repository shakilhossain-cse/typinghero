import { CreateCategory, SelectCategory } from "@/features/category";
import { UserWidget } from "@/features/user";
import { Logo } from "@/ui-kit";
import { api } from "@/utils/api";

import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const selectedCategory = api.category.getSelected.useQuery().data;
  return (
    <>
      <Head>
        <title>Typing Hero</title>
        <meta name="description" content="test your typing speed" />
      </Head>
      <main className="min-h-screen">
        <div className="container mx-auto flex items-center justify-between p-4">
          <Logo />
          <div className="flex items-center gap-2">
            <CreateCategory />
            <SelectCategory />
          </div>
          <UserWidget />
        </div>
        <pre className="container mx-auto ml-20 flex flex-1 flex-col items-center justify-center space-y-10">
          {(JSON.parse(selectedCategory?.fragments || "[]") as string[])[0]}
        </pre>
      </main>
    </>
  );
};

export default Home;
