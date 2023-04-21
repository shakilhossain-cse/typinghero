import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <h1 className="text-2xl font-bold tracking-wide">Typing Hero</h1>
      </Link>
    </div>
  );
};

export default Logo;
