import React, { useEffect, useState } from "react";
import { createDirectory,getDirectories } from '../api/direcoryApi';
import { useParams } from "react-router-dom";
import { getBoxDetail } from "../api/boxApi";
import DirectoryList from './DirectoryList';


const BoxDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [box, setBox] = useState<any>(null);
  const [directoryName, setDirectoryName] = useState('');
  const [directories, setDirectories] = useState([]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = parseInt(localStorage.getItem("user_id") || "0", 10);
    if (id) {
      const result = await createDirectory(directoryName, userId, parseInt(id, 10));
      if (result) {
        loadDirectories();
        return;
      } else {
        alert('Error creating directory');
      }
    } else {
      console.error('Error: box id is not defined.');
    }
  };

  const loadDirectories = async () => {
    if (id) {
      const boxId = parseInt(id, 10);
      const directories = await getDirectories(boxId);
      setDirectories(directories);
    } else {
      console.error('Error: box id is not defined.');
    }
  };

  useEffect(() => {
    if (!id) {
      console.error('Error: box id is not defined.');
      return;
    }
  
    const fetchBoxDetails = async () => {
      const boxId = parseInt(id, 10);
      const boxDetails = await getBoxDetail(boxId);
      setBox(boxDetails);
    };
  
    fetchBoxDetails();
    loadDirectories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!box) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>ボックス詳細</h2>
      <p>ボックス名: {box.name}</p>
      <p>作成者ID: {box.created_by}</p>
      <p>作成日時: {box.created_at}</p>
      <p>更新日時: {box.updated_at}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="boxName">ディレクトリ作成</label>
        <input
          type="text"
          id="boxName"
          value={directoryName}
          onChange={(e) => setDirectoryName(e.target.value)}
        />
        <button type="submit">作成</button>
      </form>
      <DirectoryList directories={directories} />
    </div>
  );
};

export default BoxDetails;
