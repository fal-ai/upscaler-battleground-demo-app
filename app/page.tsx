"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import * as fal from "@fal-ai/serverless-client";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ModelIcon } from "@/components/icons/model-icon";
import Link from "next/link";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { cx } from "class-variance-authority";

function randomSeed() {
  return Math.floor(Math.random() * 10000000).toFixed(0);
}

fal.config({
  proxyUrl: "/api/proxy",
});

const INPUT_DEFAULTS = {
  _force_msgpack: new Uint8Array([]),
  enable_safety_checker: true,
  image_size: "square_hd",
  sync_mode: true,
  num_images: 1,
  num_inference_steps: "2",
};

interface ModelResult {
  name: string;
  image: string;
  inferenceTime: number;
}

type CompareMode = "original" | "model";

export default function Lightning() {
  const [image, setImage] = useState<null | string>(null);
  const [mode, setMode] = useState<CompareMode>("original");
  const [inferenceTime, setInferenceTime] = useState<number>(NaN);
  const [position, setPosition] = useState<number>(50);
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  const [modelOne, setModelOne] = useState<ModelResult | null>(null);
  const [modelTwo, setModelTwo] = useState<ModelResult | null>(null);

  const connect = async (prompt: File) => {
    const result: Record<string, any> = await fal.subscribe("fal-ai/ccsr", {
      input: {
        image_url: prompt,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS" && update.logs) {
          // update.logs.map((log) => log.message).forEach(console.log);
          console.log(update.logs.slice(-1)[0]?.message);
        }
      },
    });

    if (result) {
      setImage(result.image.url as string);
    }

    console.log(result);
  };

  const timer = useRef<any | undefined>(undefined);

  const handleOnChange = async (prompt: File) => {
    const blobUrl = URL.createObjectURL(prompt);
    setOriginalImage(blobUrl);

    connect(prompt);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.document.cookie = "fal-app=true; path=/; samesite=strict; secure;";
    }
  }, []);

  return (
    <main>
      <div className="flex flex-col justify-between h-[calc(100vh-56px)]">
        <div className="py-4 md:py-10 px-0 space-y-4 lg:space-y-8 mx-auto w-full max-w-5xl">
          <div className="container px-3 md:px-0 flex flex-col space-y-2">
            <div className="flex flex-col max-md:space-y-4 md:flex-row md:space-x-4 max-w-full">
              <div className="flex-1 space-y-1">
                <label>Prompt</label>
                <Input
                  type="file"
                  onChange={(e) => {
                    if (e.target?.files?.[0]) {
                      handleOnChange(e.target?.files?.[0]);
                    }
                  }}
                  className="font-light w-full mx-auto"
                  placeholder="Type something..."
                />
              </div>
            </div>
          </div>
          {mode === "model" && (
            <div className="container flex flex-col space-y-6 lg:flex-row lg:space-y-0 p-3 md:px-0 pt-10 space-x-6">
              <div className="flex-1 flex-col flex items-center justify-center">
                {image && (
                  <div className="md:min-h-[512px] w-1/2 flex">
                    <ReactCompareSlider
                      position={position}
                      onPositionChange={(position) => setPosition(position)}
                      itemOne={
                        <>
                          <div className="absolute space-x-2 top-[50%] left-4 z-50 bg-white/10 text-xs py-1 rounded-full px-2">
                            <span>CCSR</span>
                            {inferenceTime && (
                              <span
                                className={
                                  !inferenceTime
                                    ? "text-neutral-500"
                                    : "text-green-400"
                                }
                              >
                                {inferenceTime
                                  ? `${(inferenceTime * 1000).toFixed(0)}ms`
                                  : `n/a`}
                              </span>
                            )}
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
                          <div className="absolute space-x-2 top-[50%] right-4 z-50 bg-white/10 text-xs py-1 rounded-full px-2">
                            {inferenceTime && (
                              <span
                                className={
                                  !inferenceTime
                                    ? "text-neutral-500"
                                    : "text-green-400"
                                }
                              >
                                {inferenceTime
                                  ? `${(inferenceTime * 1000).toFixed(0)}ms`
                                  : `n/a`}
                              </span>
                            )}
                            <span>SUPIR</span>
                          </div>
                          <ReactCompareSliderImage
                            src={image as string}
                            srcSet={image as string}
                            alt="Image one"
                          />
                        </>
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {mode === "original" && (
            <div className="container flex flex-col space-y-6 lg:flex-row lg:space-y-0 p-3 md:px-0 pt-10 space-x-6">
              <div className="flex-1 flex-col flex items-center justify-center">
                {image && inferenceTime && (
                  <div className="flex space-x-3 w-full">
                    <div className="flex flex-row space-x-1 text-sm mb-2">
                      <span className="text-neutral-500">Modal:</span>
                      <span className={"text-purple-400 whitespace-nowrap"}>
                        CCSR Upscaler
                      </span>
                    </div>
                    <div className="flex flex-row space-x-1 text-sm mb-2">
                      <span className="text-neutral-500">Inference time:</span>
                      <span
                        className={
                          !inferenceTime ? "text-neutral-500" : "text-green-400"
                        }
                      >
                        {inferenceTime
                          ? `${(inferenceTime * 1000).toFixed(0)}ms`
                          : `n/a`}
                      </span>
                    </div>
                  </div>
                )}
                {image && (
                  <div className="md:min-h-[512px] w-full flex">
                    <ReactCompareSlider
                      position={position}
                      onPositionChange={(position) => setPosition(position)}
                      itemOne={
                        <>
                          <div className="absolute top-[50%] left-4 z-50 bg-white/10 text-xs py-1 rounded-full px-2">
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
                          <div className="absolute top-[50%] right-4 z-50 bg-white/10 text-xs py-1 rounded-full px-2">
                            CCSR
                          </div>
                          <ReactCompareSliderImage
                            src={image as string}
                            srcSet={image as string}
                            alt="Image one"
                          />
                        </>
                      }
                    />
                    {/* {image && (
                    <img id="imageDisplay" src={image} alt="Dynamic Image" />
                  )} */}
                  </div>
                )}
              </div>

              <div className="flex-1 flex-col flex items-center justify-center">
                {image && inferenceTime && (
                  <div className="flex space-x-3 w-full">
                    <div className="flex flex-row space-x-1 text-sm mb-2">
                      <span className="w-1/2 text-neutral-500">Modal:</span>
                      <span className={"text-purple-400 whitespace-nowrap"}>
                        SUPIR Upscaler
                      </span>
                    </div>
                    <div className="flex flex-row space-x-1 text-sm mb-2">
                      <span className="text-neutral-500">Inference time:</span>
                      <span
                        className={
                          !inferenceTime ? "text-neutral-500" : "text-green-400"
                        }
                      >
                        {inferenceTime
                          ? `${(inferenceTime * 1000).toFixed(0)}ms`
                          : `n/a`}
                      </span>
                    </div>
                  </div>
                )}
                {image && (
                  <div className="md:min-h-[512px] w-full flex">
                    <ReactCompareSlider
                      className="relative"
                      position={position}
                      onPositionChange={(position) => setPosition(position)}
                      itemOne={
                        <>
                          <div className="absolute top-[50%] left-4 z-50 bg-white/10 text-xs py-1 rounded-full px-2">
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
                          <div className="absolute top-[50%] right-4 z-50 bg-white/10 text-xs py-1 rounded-full px-2">
                            SUPIR
                          </div>
                          <ReactCompareSliderImage
                            src={image as string}
                            srcSet={image as string}
                            alt="Image one"
                          />
                        </>
                      }
                    />
                    {/* {image && (
                    <img id="imageDisplay" src={image} alt="Dynamic Image" />
                  )} */}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col space-y-2 text-sm items-center justify-center mx-auto">
              <label className="text-neutral-300 uppercase text-xs">
                Compare Mode
              </label>
              <div className="w-fit bg-neutral-900 p-1 rounded-full flex items-center justify-between space-x-2">
                <span
                  onClick={() => setMode("original")}
                  className={cx(
                    mode === "original" && "bg-neutral-800",
                    "w-1/2 cursor-pointer text-neutral-400 text-sm  rounded-full h-8 px-3 flex items-center"
                  )}
                >
                  Original
                </span>
                <span
                  onClick={() => setMode("model")}
                  className={cx(
                    mode === "model" && "bg-neutral-800",
                    "w-1/2 cursor-pointer text-neutral-400 text-sm  rounded-full h-8 px-3 flex items-center"
                  )}
                >
                  Model
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center my-4">
          <p className="text-sm text-base-content/70 py-4 text-center text-neutral-400">
            This playground is hosted on{" "}
            <strong>
              <a href="https://fal.ai" className="underline" target="_blank">
                fal.ai
              </a>
            </strong>{" "}
            and is for demonstration purposes only.
          </p>
          <div className="flex flex-row items-center space-x-2">
            <span className="text-xs font-mono">powered by</span>
            <Link href="https://fal.ai" target="_blank">
              <ModelIcon />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
