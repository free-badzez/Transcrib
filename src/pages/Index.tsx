import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import FileUpload from '@/components/FileUpload';
import TranscriptionResult from '@/components/TranscriptionResult';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const { toast } = useToast();

  // Hardcoded Deepgram API key
  const apiKey = "e90d9ae004d7d5716498b3f706af63931e6a40bc";

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setTranscription('');
    toast({
      title: "File selected",
      description: file.name,
    });
  };

  const handleTranscribe = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an audio file first.",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "API Key Missing",
        description: "Please hardcode your Deepgram API key in the code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Read the file as an ArrayBuffer
      const fileBuffer = await selectedFile.arrayBuffer();

      const response = await fetch(`https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&language=${language}`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': selectedFile.type,
        },
        body: fileBuffer,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      const transcriptionText = data.results?.channels[0]?.alternatives[0]?.transcript || '';
      setTranscription(transcriptionText);

      toast({
        title: "Success",
        description: "Audio transcribed successfully!",
      });
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        title: "Error",
        description: "Failed to transcribe the audio file. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-2">Audio Transcription</h1>
        <p className="text-gray-600 text-center mb-8">Upload your audio file and get accurate transcriptions using Deepgram AI</p>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="ko">Korean</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
              <SelectItem value="ru">Russian</SelectItem>
              <SelectItem value="pt">Portuguese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
        
        {selectedFile && (
          <div className="mt-6 text-center animate-fade-in">
            <p className="text-sm text-gray-600 mb-4">
              Selected file: {selectedFile.name}
            </p>
            <Button
              onClick={handleTranscribe}
              disabled={isLoading}
              className="bg-primary hover:bg-primary-hover text-white"
            >
              {isLoading ? "Transcribing..." : "Start Transcription"}
            </Button>
          </div>
        )}

        <TranscriptionResult text={transcription} />
      </div>
    </div>
  );
};

export default Index;
