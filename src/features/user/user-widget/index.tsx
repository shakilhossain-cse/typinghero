
import { calcAvatarUrl, calcUsername } from "../lib";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserPopover } from "../user-popover";

export const UserWidget = () => {
  const { data: sessionData } = useSession();

  const username = calcUsername(sessionData?.user?.name);

  return (
    <div>
      {!sessionData && (
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => await signIn()}
        >
          Sign In
        </button>
      )}
      {sessionData && (
        <UserPopover
          username={username}
          avatarUrl={calcAvatarUrl(username)}
          popoverContent={
            <div>
              <div
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async () => await signOut()}
                className={
                  "text-m my-1 cursor-pointer px-10 py-3 text-red-500 hover:bg-gray-100"
                }
              >
                Sign out
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};
