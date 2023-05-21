import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commonStyles from "../style/CommonStyle.module.css";
import CombinedList from "../../list/CombinedList";
import { handleSubmit, loadDirectories } from "./function/directoryFunctions";
import { documentSubmit, loadDocuments } from "./function/documentFunctions";
import { handleUpdateBoxName, loadBoxDetails } from "./function/boxFunctions";
import Modal from "../../modal/Modal";

const BoxDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [box, setBox] = useState<any>(null);
  const [directoryName, setDirectoryName] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [directories, setDirectories] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [newName, setNewName] = useState("");
  const [showExplain, setShowExplain] = useState(false);
  const [showDirectoryModal, setShowDirectoryModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

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

  const handleDirectorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(id, directoryName, loadDirectoriesWrapper);
    setDirectoryName("");
    setShowDirectoryModal(false);
  };

  const handleDocumentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await documentSubmit(id, documentName, loadDocumentsWrapper);
    setDocumentName("");
    setShowDocumentModal(false);
  };

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
      <div className={commonStyles.input}>
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
      <button onClick={() => setShowDirectoryModal(true)}>
        ディレクトリ追加
      </button>
      <button onClick={() => setShowDocumentModal(true)}>
        ドキュメント追加
      </button>
      {showDirectoryModal && (
        <Modal onClose={() => setShowDirectoryModal(false)}>
          <form onSubmit={handleDirectorySubmit}>
            <label htmlFor="directoryName">ディレクトリ作成</label>
            <input
              type="text"
              id="directoryName"
              value={directoryName}
              onChange={(e) => setDirectoryName(e.target.value)}
            />
            <button type="submit">作成</button>
          </form>
        </Modal>
      )}
      {showDocumentModal && (
        <Modal onClose={() => setShowDocumentModal(false)}>
          <form onSubmit={handleDocumentSubmit}>
            <label htmlFor="documentName">ドキュメント作成</label>
            <input
              type="text"
              id="documentName"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
            <button type="submit">作成</button>
          </form>
        </Modal>
      )}

      <CombinedList directories={directories} documents={documents} />
    </div>
  );
};

export default BoxDetails;
