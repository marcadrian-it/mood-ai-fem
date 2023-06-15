const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <div className={`divide-y divide-gray-200 overflow-hidden rounded-lg shadow`} style={{ backgroundColor: entry.analysis.color }}>
      <div className="px-4 py-5">{date}</div>
      
      <div className="px-4 py-5">{entry.analysis.summary}</div>
      <div className="px-4 py-4">{entry.analysis.mood}</div>
    </div>
  );
};

export default EntryCard;
