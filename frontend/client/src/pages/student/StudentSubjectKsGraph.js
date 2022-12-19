import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Fragment,
} from "react";
import axios from "axios";
import { knogledgeSpacesRoute } from "../../utils/APIRoutes";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  updateEdge,
  getConnectedEdges,
  Background,
  Controls,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import { useNavigate, useParams } from "react-router-dom";
import { toastOptions } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";

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

const StudentSubjectKsGraph = () => {
  const navigate = useNavigate();
  const params = useParams();
  const edgeUpdateSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [name, setName] = useState("");
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [shouldDelete, setShouldDelete] = useState(false);

  useEffect(() => {
    axios
      .get(`${knogledgeSpacesRoute}/${params.subjectId}/student`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            JSON.stringify(localStorage.getItem("access-token"))
          )}`,
        },
      })
      .then((res) => {
        console.log(res);
        setNodes(res.data.nodes);
        setEdges(res.data.edges);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 400) {
          toast.error(
            "Real knowledge state doesn't exist for this student!",
            toastOptions
          );
          setTimeout(() => {
            navigate("/student");
          }, 5000);
        } else {
          toast.error(error.message, toastOptions);
        }
      });
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
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

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );

  const deleteNodeById = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  const deleteEdgeById = (id) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== id));
  };

  const onNodeClick = (event, node) => {
    if (shouldDelete) {
      const edgesToRemove = getConnectedEdges([node], edges);
      edgesToRemove.map((edge) => deleteEdgeById(edge.id));
      deleteNodeById(node.id);
    }
  };

  return (
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
                //onLoad={setRfInstance}
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
                onNodeClick={onNodeClick}
                deleteKeyCode={46}
                selectionKeyCode={17}
                //onNodeDragStop={onNodeDragStop}
                edgeTypes={edgeTypes}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
              >
                <Background color="#888" gap={16} />
                <Controls />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </Fragment>
  );
};

export default StudentSubjectKsGraph;
