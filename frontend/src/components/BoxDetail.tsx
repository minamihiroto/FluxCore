import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoxDetail } from "../api/boxApi";

const BoxDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [box, setBox] = useState<any>(null);

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
    </div>
  );
};

export default BoxDetails;
