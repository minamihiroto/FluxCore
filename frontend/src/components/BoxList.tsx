import React from 'react';

interface Box {
  id: number;
  name: string;
  created_by: number;
}

interface BoxListProps {
  boxes: Box[];
}

const BoxList: React.FC<BoxListProps> = ({ boxes }) => {
  return (
    <div>
      <h2>Box List</h2>
      <ul>
        {boxes.map((box) => (
          <li key={box.id}>{box.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BoxList;
