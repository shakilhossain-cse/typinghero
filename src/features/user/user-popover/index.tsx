import { Popover } from "@/ui-kit";
import { useState } from "react";

export const UserPopover: React.FC<{
  username: string;
  avatarUrl: string;
  popoverContent: React.ReactNode;
}> = ({ username, avatarUrl, popoverContent }) => {
  const [reference, setReference] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex cursor-pointer items-center space-x-4"
        ref={setReference}
        onClick={() => {
          setIsOpen((s) => !s);
        }}
      >
        <div className="text-l">{username}</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className=" h-9 w-9 rounded-full bg-blue-200"
          alt={"avatar"}
          src={avatarUrl}
        />
      </div>
      <Popover
        reference={reference}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {popoverContent}
      </Popover>
    </>
  );
};