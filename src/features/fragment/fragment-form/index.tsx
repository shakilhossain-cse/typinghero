import { TextArea } from "@/ui-kit";
import Image from "next/image";

interface IFragmentFormProps {
  onDelete: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}
export const FragmentFrom: React.FC<IFragmentFormProps> = ({
  onChange,
  onDelete,
  value,
}) => {
    return(<div className="relative">
        <button className="right-4 top-4 z-10 absolute">
            <Image src={'/img/remove.svg'} alt="delete" width={20} height={20}/>
        </button>
        <TextArea onChange={onChange} value={value} placeholder="Type your fragment here"/>
    </div>)
};
