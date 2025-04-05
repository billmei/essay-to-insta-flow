
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { splitTextIntoChunks } from "@/utils/textSplitter";

interface TextInputProps {
  onTextProcessed: (chunks: string[]) => void;
}

const TextInput = ({ onTextProcessed }: TextInputProps) => {
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    
    // Split the text into chunks that will fit in Instagram posts
    const chunks = splitTextIntoChunks(text, 300); // Adjust character count as needed
    
    onTextProcessed(chunks);
    setIsProcessing(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Paste Your Essay</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Paste your long-form essay here..."
          className="min-h-[200px] font-sans"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={!text.trim() || isProcessing}
          className="bg-primary hover:bg-primary/90"
        >
          {isProcessing ? "Processing..." : "Generate Instagram Posts"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TextInput;
