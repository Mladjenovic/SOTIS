import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Fragment,
} from "react";
import { Button, Row, Col } from "antd";
import axios from "axios";
import { getKnowledgeSpaceRoute } from "../../utils/APIRoutes";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  updateEdge,
  Background,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import { useParams } from "react-router-dom";

import CustomEdge from "../../components/professor/CustomEdge";

import { v4 as uuidv4 } from "uuid";
import localforage from "localforage";

localforage.config({
  name: "react-flow-docs",
  storeName: "flows",
});

const edgeTypes = {
  custom: CustomEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: "black" },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "black",
  },
};

const getId = () => uuidv4();

const GraphCompare = () => {
  const params = useParams();
  const edgeUpdateSuccessful = useRef(true);
  const edgeUpdateSuccessfulReal = useRef(true);
  const reactFlowWrapper = useRef(null);
  const reactFlowWrapperReal = useRef(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [realNodes, setRealNodes] = useNodesState([]);
  const [realEdges, setRealEdges] = useEdgesState([]);

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [reactFlowInstanceReal, setReactFlowInstanceReal] = useState(null);

  useEffect(() => {
    //Get expected KS graph
    axios
      .get(`${getKnowledgeSpaceRoute}/${params.subjectId}/expected`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        console.log("Expected: ", res);
        setNodes(res.data.nodes);
        setEdges(res.data.edges);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
      });

    // Get real KS graph
    axios
      .get(`${getKnowledgeSpaceRoute}/${params.subjectId}/real`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        console.log(console.log("Real: ", res));
        setRealNodes(res.data.nodes);
        setRealEdges(res.data.edges);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastOptions);
      });
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onConnectReal = useCallback(
    (params) => setRealEdges((eds) => addEdge(params, eds)),
    [setRealEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        position,
        data: { label: type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const onDropReal = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstanceReal.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        position,
        data: { label: type },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstanceReal]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);
  const onEdgeUpdateStartReal = useCallback(() => {
    edgeUpdateSuccessfulReal.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);
  const onEdgeUpdateReal = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessfulReal.current = true;
    setRealEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);
  const onEdgeUpdateEndReal = useCallback((_, edge) => {
    if (!edgeUpdateSuccessfulReal.current) {
      setRealEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );
  const onNodesChangeReal = useCallback(
    (changes) => setRealNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );
  const onEdgesChangeReal = useCallback(
    (changes) => setRealEdges((es) => applyEdgeChanges(changes, es)),
    []
  );

  return (
    <Row>
      <Col style={{ width: "50%" }}>
        <Fragment>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "100%" }}>
              <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    style={{
                      width: "100%",
                      height: "80vh",
                      border: "1px solid #16001E",
                    }}
                    onConnect={onConnect}
                    connectionLineStyle={{ stroke: "black", strokeWidth: 2 }}
                    connectionLineType="bezier"
                    defaultEdgeOptions={defaultEdgeOptions}
                    snapToGrid={true}
                    snapGrid={[16, 16]}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    deleteKeyCode={46}
                    selectionKeyCode={17}
                    edgeTypes={edgeTypes}
                    onEdgeUpdate={onEdgeUpdate}
                    onEdgeUpdateStart={onEdgeUpdateStart}
                    onEdgeUpdateEnd={onEdgeUpdateEnd}
                  >
                    <Background color="#888" gap={16} />
                  </ReactFlow>
                </div>
              </ReactFlowProvider>
            </div>
          </div>
        </Fragment>
      </Col>
      <Col style={{ width: "50%" }}>
        <Fragment>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "100%" }}>
              <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapperReal}>
                  <ReactFlow
                    nodes={realNodes}
                    edges={realEdges}
                    onInit={setReactFlowInstanceReal}
                    onDrop={onDropReal}
                    onDragOver={onDragOver}
                    style={{
                      width: "100%",
                      height: "80vh",
                      border: "1px solid #16001E",
                    }}
                    onConnect={onConnectReal}
                    connectionLineStyle={{ stroke: "black", strokeWidth: 2 }}
                    connectionLineType="bezier"
                    defaultEdgeOptions={defaultEdgeOptions}
                    snapToGrid={true}
                    snapGrid={[16, 16]}
                    onNodesChange={onNodesChangeReal}
                    onEdgesChange={onEdgesChangeReal}
                    deleteKeyCode={46}
                    selectionKeyCode={17}
                    edgeTypes={edgeTypes}
                    onEdgeUpdate={onEdgeUpdateReal}
                    onEdgeUpdateStart={onEdgeUpdateStartReal}
                    onEdgeUpdateEnd={onEdgeUpdateEndReal}
                  >
                    <Background color="#888" gap={32} />
                  </ReactFlow>
                </div>
              </ReactFlowProvider>
            </div>
          </div>
        </Fragment>
      </Col>
    </Row>
  );
};

export default GraphCompare;
