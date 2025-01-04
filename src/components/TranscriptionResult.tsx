import React from 'react';

interface TranscriptionResultProps {
  text: string;
}

const TranscriptionResult = ({ text }: TranscriptionResultProps) => {
  if (!text) return null;

  return (
    <div className="mt-8 animate-fade-up">
      <h2 className="text-xl font-semibold mb-4">Transcription Result</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
};

export default TranscriptionResult;