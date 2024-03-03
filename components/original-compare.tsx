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
    <div className="container flex flex-col space-y-6 lg:flex-row lg:space-y-0 p-3 md:px-0 pt-10 lg:space-x-6">
      <div className="flex-1">
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
                  <div className="absolute space-x-2 top-[50%] right-4 bg-black/50 text-xs py-1 rounded-full px-2">
                    <span>CCSR</span>
                    {modelOne && (
                      <span
                        className={
                          !modelOne ? "text-neutral-500" : "text-green-400"
                        }
                      >
                        {modelOne
                          ? `${(modelOne.inferenceTime * 1000).toFixed(0)}ms`
                          : `n/a`}
                      </span>
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
          <div className="w-full bg-neutral-900 h-96 md:h-[512px] flex items-center justify-center" />
        )}
      </div>

      <div className="flex-1">
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
                  <div className="absolute space-x-2 top-[50%] right-4 bg-black/50 text-xs py-1 rounded-full px-2">
                    {modelTwo && (
                      <span
                        className={
                          !modelTwo ? "text-neutral-500" : "text-green-400"
                        }
                      >
                        {modelTwo
                          ? `${(modelTwo.inferenceTime * 1000).toFixed(0)}ms`
                          : `n/a`}
                      </span>
                    )}
                    <span>SUPIR</span>
                  </div>
                  <ReactCompareSliderImage
                    src={modelTwo?.image as string}
                    srcSet={modelTwo?.image as string}
                    alt="Image one"
                  />
                </>
              }
            />
          </div>
        ) : (
          <div className="w-full bg-neutral-900 h-96 md:h-[512px] flex items-center justify-center" />
        )}
      </div>
    </div>
  );
};

export default OriginalCompare;
