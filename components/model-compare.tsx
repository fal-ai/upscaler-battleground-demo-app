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
  firstModelLoading: boolean;
  secondModel: any;
  secondModelOutput: any;
  secondModelLoading: boolean;
}

const ModelCompare = ({
  originalImage,
  position,
  setPosition,
  firstModel,
  firstModelOutput,
  firstModelLoading,
  secondModel,
  secondModelOutput,
  secondModelLoading,
}: ModelCompareProps) => {
  const hideFirstResult =
    firstModelLoading || firstModelOutput?.model !== firstModel.model;
  const hideSecondResult =
    secondModelLoading || secondModelOutput?.model !== secondModel.model;

  return (
    <div className="container flex w-full items-center justify-center space-y-6 p-3 md:px-0 pt-0">
      <div className="flex-1 mx-auto md:mx-0 w-full md:w-1/2">
        {originalImage ? (
          <div className="aspect-square mx-auto max-h-[512px] w-full flex items-center justify-center">
            <ReactCompareSlider
              className="w-full"
              position={position}
              onPositionChange={(position) => setPosition(position)}
              itemOne={
                <>
                  <ReactCompareSliderImage
                    className={cn(hideFirstResult && "blur-md")}
                    src={(firstModelOutput?.image || originalImage) as string}
                    srcSet={
                      (firstModelOutput?.image || originalImage) as string
                    }
                    alt="Image one"
                  />
                  <CompareImageLabel
                    modelData={firstModel}
                    modelOutput={firstModelOutput}
                    loading={firstModelLoading}
                    name={firstModel?.shortname}
                  />
                </>
              }
              itemTwo={
                <>
                  <ReactCompareSliderImage
                    className={cn(hideSecondResult && "blur-md")}
                    src={(secondModelOutput?.image || originalImage) as string}
                    srcSet={
                      (secondModelOutput?.image || originalImage) as string
                    }
                    alt="Image two"
                  />
                  <CompareImageLabel
                    loading={secondModelLoading}
                    modelData={secondModel}
                    modelOutput={secondModelOutput}
                    name={secondModel?.shortname}
                    position="right"
                  />
                </>
              }
            />
          </div>
        ) : (
          <div className="flex-1 mx-auto max-h-[512px] aspect-square bg-neutral-200 dark:bg-neutral-900 flex items-center justify-center">
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
          <div className="flex items-center mx-auto justify-between w-full md:w-1/2 mt-2">
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
