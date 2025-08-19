import { se } from "date-fns/locale";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CustomSelectProps {
  error?: string;
  label: string;
  selectContents: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

const CustomSelect = ({
  label,
  error,
  selectContents,
  value,
  onChange,
}: CustomSelectProps) => {
  return (
    <div className="space-y-4 w-full ">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-80">
          <SelectValue placeholder="Select Event Category" />
        </SelectTrigger>
        <SelectContent>
          {selectContents.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CustomSelect;
