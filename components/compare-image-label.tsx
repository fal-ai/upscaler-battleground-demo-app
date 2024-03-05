import { cn, formatTime } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

interface CompareImageLabelProps {
  modelData: any;
  name: string;
  loading: boolean;
  position?: "left" | "right";
}

const CompareImageLabel = ({
  modelData,
  name,
  loading,
  position = "left",
}: CompareImageLabelProps) => (
  <div
    className={cn(
      "absolute flex items-center space-x-2 top-[50%] text-black dark:text-white bg-white/40 dark:bg-black/50 text-xs py-1 rounded-full px-2",
      position === "right" ? "right-4" : "left-4"
    )}
  >
    <span>{name}</span>
    {loading ? (
      <LoaderIcon className="animate-spin w-4 h-4 text-green-400" />
    ) : (
      <span className={!modelData ? "text-neutral-500" : "text-green-400"}>
        {modelData ? formatTime(modelData.inferenceTime * 1000) : `n/a`}
      </span>
    )}
  </div>
);

export default CompareImageLabel;
