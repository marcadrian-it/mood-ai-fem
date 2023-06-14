'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';

const Question = () => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setValue('');
    setIsLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled={isLoading}
          type="text"
          value={value}
          onChange={onChange}
          className="border border-gray-300 px-4 py-2 text-lg rounded-lg"
          placeholder="Ask a question..."
        />
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
      {isLoading && <div>Loading...</div>}
      {response && <div>{response}</div>}
    </div>
  );
};

export default Question;
