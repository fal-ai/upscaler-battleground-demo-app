import { cn, formatTime } from "@/lib/utils";
import Image from "next/image";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import CompareImageLabel from "./compare-image-label";

interface ModelCompareProps {
  originalImage: string | null;
  position: number;
  setPosition: (position: number) => void;
  firstModel: any;
  firstModelOutput: any;
  secondModel: any;
  secondModelOutput: any;
}

const ModelCompare = ({
  originalImage,
  position,
  setPosition,
  firstModel,
  firstModelOutput,
  secondModel,
  secondModelOutput,
}: ModelCompareProps) => {
  return (
    <div className="container flex flex-col space-y-6 lg:flex-row lg:space-y-0 p-3 md:px-0 pt-2 space-x-6">
      <div className="flex-1 flex-col flex w-full items-center justify-center">
        {originalImage ? (
          <div className="md:min-h-[512px] w-full md:w-1/2 bg-neutral-900 flex">
            <ReactCompareSlider
              className="w-full"
              position={position}
              onPositionChange={(position) => setPosition(position)}
              itemOne={
                <>
                  <ReactCompareSliderImage
                    className={cn(!firstModelOutput && "blur-md")}
                    src={(firstModelOutput?.image || originalImage) as string}
                    srcSet={
                      (firstModelOutput?.image || originalImage) as string
                    }
                    alt="Image one"
                  />
                  <CompareImageLabel
                    modelData={firstModelOutput}
                    name={firstModel?.shortname}
                  />
                </>
              }
              itemTwo={
                <>
                  <ReactCompareSliderImage
                    className={cn(!secondModelOutput && "blur-md")}
                    src={(secondModelOutput?.image || originalImage) as string}
                    srcSet={
                      (secondModelOutput?.image || originalImage) as string
                    }
                    alt="Image two"
                  />
                  <CompareImageLabel
                    modelData={secondModelOutput}
                    name={secondModel?.shortname}
                    position="right"
                  />
                </>
              }
            />
          </div>
        ) : (
          <div className="w-full md:w-1/2 bg-neutral-200 dark:bg-neutral-900 h-96 md:h-[512px] flex items-center justify-center">
            <Image
              width={150}
              height={150}
              src="https://fal.ai/fal-icon.svg"
              className="transition-all object-cover mb-6 data-[loading=true]:animate-pulse data-[loading=false]:grayscale data-[loading=false]:opacity-30"
              alt="fal.ai icon used as image placeholder and loading indicator"
              data-loading="false"
            />
          </div>
        )}
        {firstModel && secondModel && (
          <div className="flex items-center justify-between w-full md:w-1/2 mt-2">
            <div className="flex items-center justify-end space-x-2 mb-1">
              <Image
                alt=""
                src="https://fal.ai/fal-icon.svg"
                width={16}
                height={16}
              />
              <a
                href={firstModel?.link}
                className="text-indigo-400 font-medium text-sm"
                target="_blank"
              >
                {firstModel?.model}
              </a>
            </div>
            <div className="flex items-center justify-end space-x-2 mb-1">
              <Image
                alt=""
                src="https://fal.ai/fal-icon.svg"
                width={16}
                height={16}
              />
              <a
                href={secondModel?.link}
                className="text-indigo-400 font-medium text-sm"
                target="_blank"
              >
                {secondModel?.model}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelCompare;
