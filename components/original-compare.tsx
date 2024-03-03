import { formatTime } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const OriginalCompare = ({
  originalImage,
  position,
  setPosition,
  modelOne,
  modelTwo,
}) => {
  return (
    <div className="container flex flex-col space-y-6 lg:flex-row lg:space-y-0 p-3 md:px-0 pt-7 lg:space-x-6">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
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
        {originalImage ? (
          <div className="md:min-h-[512px] w-full flex items-center just">
            <ReactCompareSlider
              className="relative w-full"
              position={position}
              onPositionChange={(position) => setPosition(position)}
              itemOne={
                <>
                  <div className="absolute top-[50%] left-4 bg-black/50 text-xs py-1 rounded-full px-2">
                    Original
                  </div>
                  <ReactCompareSliderImage
                    src={originalImage as string}
                    srcSet={originalImage as string}
                    alt="Image one"
                  />
                </>
              }
              itemTwo={
                <>
                  <div className="absolute flex items-center space-x-2 top-[50%] right-4 bg-black/50 text-xs py-1 rounded-full px-2">
                    <span>CCSR</span>
                    {modelOne ? (
                      <span
                        className={
                          !modelOne ? "text-neutral-500" : "text-green-400"
                        }
                      >
                        {modelOne
                          ? formatTime(modelOne.inferenceTime * 1000)
                          : `n/a`}
                      </span>
                    ) : (
                      <LoaderIcon className="animate-spin w-4 h-4 text-green-400" />
                    )}
                  </div>
                  <ReactCompareSliderImage
                    src={modelOne?.image as string}
                    srcSet={modelOne?.image as string}
                    alt="Image one"
                  />
                </>
              }
            />
            {/* {image && (
              <img id="imageDisplay" src={image} alt="Dynamic Image" />
            )} */}
          </div>
        ) : (
          <div className="w-full bg-neutral-900 h-96 md:h-[512px] flex items-center justify-center">
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

      <div className="flex-1">
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
        {originalImage ? (
          <div className="md:min-h-[512px] w-full flex items-center justify-center">
            <ReactCompareSlider
              className="relative w-full"
              position={position}
              onPositionChange={(position) => setPosition(position)}
              itemOne={
                <>
                  <div className="absolute top-[50%] left-4 bg-black/50 text-xs py-1 rounded-full px-2">
                    Original
                  </div>
                  <ReactCompareSliderImage
                    src={originalImage as string}
                    srcSet={originalImage as string}
                    alt="Image one"
                  />
                </>
              }
              itemTwo={
                <>
                  <ReactCompareSliderImage
                    src={modelTwo?.image as string}
                    srcSet={modelTwo?.image as string}
                    alt="Image one"
                  />
                  <div className="absolute flex items-center space-x-2 top-[50%] right-4 bg-black/50 text-xs py-1 rounded-full px-2">
                    <span>SUPIR</span>
                    {modelTwo ? (
                      <span
                        className={
                          !modelTwo ? "text-neutral-500" : "text-green-400"
                        }
                      >
                        {modelTwo
                          ? formatTime(modelTwo.inferenceTime * 1000)
                          : `n/a`}
                      </span>
                    ) : (
                      <LoaderIcon className="animate-spin w-4 h-4 text-green-400" />
                    )}
                  </div>
                </>
              }
            />
          </div>
        ) : (
          <div className="w-full bg-neutral-900 h-96 md:h-[512px] flex items-center justify-center">
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

export default OriginalCompare;
