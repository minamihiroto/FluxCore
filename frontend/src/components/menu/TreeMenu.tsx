import React, { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import styles from "./style/TreeMenu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faFolder,
  faFile,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Link } from "react-router-dom";

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
        <li
          className={classNames(styles.li, {
            [styles.boxItem]: node.node_labels.includes("Box"),
          })}
        >
          <div>
            {!node.node_labels.includes("Document") && (
              <FontAwesomeIcon
                icon={
                  expandedNodes.has(node.id) ? faChevronDown : faChevronRight
                }
                className={classNames(styles.icon, {
                  [styles.pointer]: node.children.length > 0,
                  [styles.disabled]:
                    node.children.length === 0 &&
                    (node.node_labels.includes("Box") ||
                      node.node_labels.includes("Directory")),
                })}
                onClick={() => node.children.length > 0 && handleClick(node.id)}
              />
            )}
          </div>
          <div
            onClick={() => handleNodeClick(node)}
            className={classNames(styles.text)}
          >
            {node.node_labels.includes("Box") && (
              <FontAwesomeIcon icon={faBox} className={styles.icon} />
            )}
            {node.node_labels.includes("Directory") && (
              <FontAwesomeIcon icon={faFolder} className={styles.icon} />
            )}
            {node.node_labels.includes("Document") && (
              <FontAwesomeIcon icon={faFile} className={styles.icon} />
            )}
            <span className={styles.nodeName}>{node.name}</span>
          </div>
          {node.children.length > 0 && expandedNodes.has(node.id) && (
            <ul className={styles.ul}>{renderTreeNodes(node.children)}</ul>
          )}
        </li>
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.tree}>
      <Link to="/" className={styles.logo}>
        FluxFlow
      </Link>
      <ul className={styles.ul}>{renderTreeNodes(tree)}</ul>
    </div>
  );
};

export default TreeMenu;
