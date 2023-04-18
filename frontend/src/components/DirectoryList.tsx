import React from 'react';

interface Directory {
  id: number;
  name: string;
  created_by: number;
}

interface DirectoryListProps {
  directories: Directory[];
}

const DirectoryList: React.FC<DirectoryListProps> = ({ directories }) => {
  return (
    <div>
      <h2>ディレクトリ一覧</h2>
      <ul>
        {directories.map((directory) => (
          <li key={directory.id}>
            <p>{directory.name}</p>
            <p>作成者:{directory.created_by}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectoryList;
