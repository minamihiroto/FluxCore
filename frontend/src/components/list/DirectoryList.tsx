import React from 'react';
import { Link } from 'react-router-dom';

interface Directory {
  id: number;
  name: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

interface DirectoryListProps {
  directories: Directory[];
}

const DirectoryList: React.FC<DirectoryListProps> = ({ directories }) => {
  const sortedDirectories = [...directories].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  return (
    <div>
      <h2>ディレクトリ一覧</h2>
      <ul>
        {sortedDirectories.map((directory) => (
          <li key={directory.id}>
            <Link to={`/directory/${directory.id}`}>{directory.name}</Link>
            <p>作成者:{directory.created_by}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectoryList;
