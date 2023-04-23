import React, { useEffect, useState } from "react";
import axios from "../axiosConfig"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faFolder, faFile, faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface TreeNode {
  id: number;
  name: string;
  node_labels: string[];
  created_by: number;
  parentId: number | null;
  parent_labels: string[] | null;
}

interface TreeNodeWithChildren extends TreeNode {
  children: TreeNodeWithChildren[];
}

const TreeMenu: React.FC = () => {
  const [data, setData] = useState<TreeNode[]>([]);
  const [tree, setTree] = useState<TreeNodeWithChildren[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/menu/tree/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const buildTree = (
      nodes: TreeNode[],
      parentId: number | null
    ): TreeNodeWithChildren[] => {
      const treeNodes: TreeNodeWithChildren[] = nodes
        .filter((node) => node.parentId === parentId)
        .map((node) => ({
          ...node,
          children: buildTree(nodes, node.id),
        }));
      return treeNodes;
    };

    setTree(buildTree(data, null));
  }, [data]);

  const handleClick = (nodeId: number) => {
    setExpandedNodes((prevState) => {
      const newState = new Set(prevState);
      if (newState.has(nodeId)) {
        newState.delete(nodeId);
      } else {
        newState.add(nodeId);
      }
      return newState;
    });
  };

  const handleNodeClick = (node: TreeNode) => {
    if (node.node_labels.includes("Box")) {
      navigate(`/box/${node.id}`);
    } else if (node.node_labels.includes("Directory")) {
      navigate(`/directory/${node.id}`);
    } else if (node.node_labels.includes("Document")) {
      navigate(`/document/${node.id}`);
    }
  };

  const renderTreeNodes = (nodes: TreeNodeWithChildren[]) => {
    return nodes.map((node) => (
      <React.Fragment key={node.id}>
        <li style={{ listStyle: "none" }}>
          {!node.node_labels.includes("Document") && (
            <FontAwesomeIcon
              icon={expandedNodes.has(node.id) ? faChevronDown : faChevronRight}
              style={{
                marginRight: "5px",
                cursor: node.children.length > 0 ? "pointer" : "default",
                color: node.children.length > 0 ? "inherit" : "gray",
                pointerEvents: node.children.length > 0 ? "auto" : "none",
              }}
              onClick={() =>
                node.children.length > 0 && handleClick(node.id)
              }/>
          )}
          {node.node_labels.includes("Box") && (
            <FontAwesomeIcon icon={faBox} style={{ marginRight: "5px" }} />
          )}
          {node.node_labels.includes("Directory") && (
            <FontAwesomeIcon icon={faFolder} style={{ marginRight: "5px" }} />
          )}
          {node.node_labels.includes("Document") && (
            <FontAwesomeIcon icon={faFile} style={{ marginRight: "5px" }} />
          )}
          <span
            onClick={() => handleNodeClick(node)}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {node.name}
          </span>
          {node.children.length > 0 && expandedNodes.has(node.id) && (
            <ul style={{ listStyle: "none" }}>{renderTreeNodes(node.children)}</ul>
          )}
        </li>
      </React.Fragment>
    ));
  };

  return (
    <div className="tree-menu">
      <ul>{renderTreeNodes(tree)}</ul>
    </div>
  );
};

export default TreeMenu;
