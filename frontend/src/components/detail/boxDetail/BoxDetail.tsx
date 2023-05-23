import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commonStyles from "../style/CommonStyle.module.css";
import CombinedList from "../../list/CombinedList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { handleUpdateBoxName, loadBoxDetails } from "./function/boxFunctions";
import { loadDirectories } from "./function/directoryFunctions";
import { loadDocuments } from "./function/documentFunctions";

const BoxDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [box, setBox] = useState<any>(null);
  const [directories, setDirectories] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [newName, setNewName] = useState("");
  const [showExplain, setShowExplain] = useState(false);

  useEffect(() => {
    loadBoxDetailsWrapper();
    loadDirectoriesWrapper();
    loadDocumentsWrapper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (box && newName !== box.name) {
      handleUpdateBoxName(id, newName, loadBoxDetailsWrapper);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newName]);

  if (!id) {
    return <div>Box ID is not defined</div>;
  }

  const loadDirectoriesWrapper = async () => {
    const directories = await loadDirectories(id);
    setDirectories(directories);
  };

  const loadDocumentsWrapper = async () => {
    const documents = await loadDocuments(id);
    setDocuments(documents);
  };

  const loadBoxDetailsWrapper = async () => {
    const boxDetails = await loadBoxDetails(id);
    setBox(boxDetails);
    setNewName(boxDetails.name);
  };

  const handleShowExplain = () => {
    setShowExplain(!showExplain);
  };

  if (!box) {
    return <div>Loading...</div>;
  }

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.metadata}>
        <p>作成者ID: {box.created_by}</p>
        <div className={commonStyles.metadataTime}>
          <p>作成日時: {box.created_at}</p>
          <p>更新日時: {box.updated_at}</p>
        </div>
      </div>
      <div className={commonStyles.inputContainer}>
      <FontAwesomeIcon icon={faBox} className={commonStyles.icon} />
        <input
          type="text"
          id="boxName"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className={commonStyles.editInput}
        />
      </div>
      <div className={commonStyles.explainContainer}>
        <p
          className={commonStyles.explainAccordion}
          onClick={handleShowExplain}
        >
          詳細を見る
        </p>
        {showExplain && <p>{box.explain}</p>}
      </div>
      <CombinedList
        directories={directories}
        documents={documents}
        id={id}
        loadDirectoriesWrapper={loadDirectoriesWrapper}
        loadDocumentsWrapper={loadDocumentsWrapper}
      />
    </div>
  );
};

export default BoxDetails;
