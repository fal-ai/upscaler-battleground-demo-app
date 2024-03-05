"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export interface Model {
  shortname: string;
  name: string;
  model: string;
  link: string;
}

export const UPSCALE_MODELS: Model[] = [
  {
    shortname: "CCSR",
    name: "CCSR Upscaler",
    model: "fal-ai/ccsr",
    link: "https://fal.ai/models/ccsr",
  },
  {
    shortname: "SUPIR",
    name: "SUPIR Upscaler",
    model: "fal-ai/supir",
    link: "https://fal.ai/models/supir",
  },
  {
    shortname: "CREATIVE",
    name: "Creative Upscaler",
    model: "fal-ai/creative-upscaler",
    link: "https://fal.ai/models/creative-upscaler",
  },
  {
    shortname: "ESRGAN",
    name: "ESRGAN Upscaler",
    model: "fal-ai/esrgan",
    link: "https://fal.run/fal-ai/esrgan",
  },
];

export function ModelDropdown({
  onSelect,
  value,
}: {
  value: Model | null;
  onSelect: (model: Model) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-lg">
          <span className="mr-1">{value ? value.name : "Select Model"}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {UPSCALE_MODELS.map((model) => (
          <DropdownMenuItem key={model.name} onClick={() => onSelect(model)}>
            {model.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}