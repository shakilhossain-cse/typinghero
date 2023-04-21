import { CreateCategory } from "@/features/category/create-category/create-category";
import { SelectCategory } from "@/features/category/select-category";
import { UserWidget } from "@/features/user/user-widget";
import Logo from "@/ui-kit/logo";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
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
      </main>
    </>
  );
};

export default Home;
