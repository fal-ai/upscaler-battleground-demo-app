import { formatTime } from "@/lib/utils";
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
  modelOne: any;
  modelTwo: any;
}

const ModelCompare = ({
  originalImage,
  position,
  setPosition,
  modelOne,
  modelTwo,
}: ModelCompareProps) => {
  return (
    <div className="container flex flex-col space-y-6 lg:flex-row lg:space-y-0 p-3 md:px-0 pt-7 space-x-6">
      <div className="flex-1 flex-col flex w-full items-center justify-center">
        <div className="flex items-center justify-between w-full md:w-1/2">
          <div className="flex items-center justify-end space-x-2 mb-1">
            <Image
              alt=""
              src="https://fal.ai/fal-icon.svg"
              width={16}
              height={16}
            />
            <a
              href="https://fal.ai/models/ccsr"
              className="text-indigo-400 font-medium text-sm"
              target="_blank"
            >
              fal-ai/ccsr
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
              href="https://fal.ai/models/supir"
              className="text-indigo-400 font-medium text-sm"
              target="_blank"
            >
              fal-ai/supir
            </a>
          </div>
        </div>
        {originalImage ? (
          <div className="md:min-h-[512px] w-full md:w-1/2 bg-neutral-900 flex">
            <ReactCompareSlider
              className="w-full"
              position={position}
              onPositionChange={(position) => setPosition(position)}
              itemOne={
                <>
                  <CompareImageLabel modelData={modelOne} name="CCSR" />
                  <ReactCompareSliderImage
                    src={(modelOne?.image || originalImage) as string}
                    srcSet={(modelOne?.image || originalImage) as string}
                    alt="Image one"
                  />
                </>
              }
              itemTwo={
                <>
                  <CompareImageLabel
                    modelData={modelTwo}
                    name="SUPIR"
                    position="right"
                  />

                  <ReactCompareSliderImage
                    src={(modelTwo?.image || originalImage) as string}
                    srcSet={(modelTwo?.image || originalImage) as string}
                    alt="Image one"
                  />
                </>
              }
            />
          </div>
        ) : (
          <div className="w-full md:w-1/2 bg-neutral-900 h-96 md:h-[512px] flex items-center justify-center">
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
      </div>
    </div>
  );
};

export default ModelCompare;
