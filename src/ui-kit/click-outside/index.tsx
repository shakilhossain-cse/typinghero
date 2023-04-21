import { useEffect } from "react";

export type Ref = HTMLElement | null;

function useOutsideAlerter(ref: Ref[], cb: () => void) {
  useEffect(() => {
    if (!ref) return;
    /**
     * Alert if click outside of element
     */
    function handelClickOutside(event: MouseEvent) {
      for (let i = 0; i < ref.length; i++) {
        if (ref[i] && ref[i]?.contains(event?.target as HTMLElement)) return;
      }
      cb && cb();
      event.stopPropagation();
    }
    // bind the event listener
    document.addEventListener("mousedown", handelClickOutside);

    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", handelClickOutside);
    };
  }, [ref, cb]);
}
/**
 * component that alerts if you click outside of it
 */
export default function ClickOutside({
  reference,
  children,
  onClickOutside,
}: {
  reference: Ref[];
  children: React.ReactNode;
  onClickOutside: () => void;
}) {
  useOutsideAlerter(reference, onClickOutside);
  return <>{children}</>;
}
