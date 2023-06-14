'use client';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';

const Editor = ({ entry }) => {
  const [content, setContent] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  useAutosave({
    data: content,
    onSave: async (_content) => {
      setIsLoading(true);
      const updated = await updateEntry(entry.id, _content);
      setIsLoading(false);
    },
  });
  return (
    <div className="w-full h-full">
      {isLoading && <div>🌀... loading</div>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none "
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Editor;
