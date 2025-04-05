
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export interface StyleOptionsType {
  background: string;
  fontFamily: string;
  fontSize: string;
  textColor: string;
}

interface StyleOptionsProps {
  style: StyleOptionsType;
  onStyleChange: (style: StyleOptionsType) => void;
}

const StyleOptions = ({ style, onStyleChange }: StyleOptionsProps) => {
  const updateStyle = (property: keyof StyleOptionsType, value: string) => {
    onStyleChange({ ...style, [property]: value });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Style Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Background Options */}
        <div className="space-y-2">
          <Label>Background</Label>
          <RadioGroup
            value={style.background}
            onValueChange={(value) => updateStyle("background", value)}
            className="grid grid-cols-2 gap-2 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gradient-blue-purple" id="gradient-blue-purple" />
              <Label htmlFor="gradient-blue-purple" className="cursor-pointer">
                <div className="w-12 h-6 rounded gradient-blue-purple"></div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gradient-peach-cream" id="gradient-peach-cream" />
              <Label htmlFor="gradient-peach-cream" className="cursor-pointer">
                <div className="w-12 h-6 rounded gradient-peach-cream"></div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gradient-green-blue" id="gradient-green-blue" />
              <Label htmlFor="gradient-green-blue" className="cursor-pointer">
                <div className="w-12 h-6 rounded gradient-green-blue"></div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gradient-pink-purple" id="gradient-pink-purple" />
              <Label htmlFor="gradient-pink-purple" className="cursor-pointer">
                <div className="w-12 h-6 rounded gradient-pink-purple"></div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="#FFFFFF" id="solid-white" />
              <Label htmlFor="solid-white" className="cursor-pointer">
                <div className="w-12 h-6 rounded border border-gray-200 bg-white"></div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="#000000" id="solid-black" />
              <Label htmlFor="solid-black" className="cursor-pointer">
                <div className="w-12 h-6 rounded bg-black"></div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Font Family */}
        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select
            value={style.fontFamily}
            onValueChange={(value) => updateStyle("fontFamily", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Inter, sans-serif">Sans-serif</SelectItem>
              <SelectItem value="Georgia, serif">Serif</SelectItem>
              <SelectItem value="Playfair Display, serif">Display</SelectItem>
              <SelectItem value="monospace">Monospace</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Font Size */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Font Size</Label>
            <span className="text-sm text-muted-foreground">{style.fontSize.replace('px', '')}</span>
          </div>
          <Slider 
            min={16}
            max={32}
            step={1}
            value={[parseInt(style.fontSize)]}
            onValueChange={(value) => updateStyle("fontSize", `${value[0]}px`)}
          />
        </div>
        
        {/* Text Color */}
        <div className="space-y-2">
          <Label>Text Color</Label>
          <RadioGroup
            value={style.textColor}
            onValueChange={(value) => updateStyle("textColor", value)}
            className="grid grid-cols-3 gap-2 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="#000000" id="text-black" />
              <Label htmlFor="text-black" className="cursor-pointer">Black</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="#FFFFFF" id="text-white" />
              <Label htmlFor="text-white" className="cursor-pointer">White</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="#333333" id="text-gray" />
              <Label htmlFor="text-gray" className="cursor-pointer">Gray</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="#6E59A5" id="text-purple" />
              <Label htmlFor="text-purple" className="cursor-pointer">Purple</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="#1EAEDB" id="text-blue" />
              <Label htmlFor="text-blue" className="cursor-pointer">Blue</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default StyleOptions;
