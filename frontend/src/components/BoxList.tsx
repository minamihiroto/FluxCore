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
      <h2>ボックス一覧</h2>
      <ul>
        {boxes.map((box) => (
          <li key={box.id}>
            <p>ボックス名:{box.name}</p>
            <p>作成者:{box.created_by}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoxList;
