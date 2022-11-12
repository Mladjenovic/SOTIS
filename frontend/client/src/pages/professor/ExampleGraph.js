import React, { useState, useCallback, Fragment } from "react";

import ReactFlow, {
  addEdge,
  addNode,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  applyNodeChanges, applyEdgeChanges,
  useNodesState, useEdgesState
} from "react-flow-renderer";

import CustomEdge from "../../components/professor/CustomEdge";
import Sidebar from "../../components/professor/Sidebar";

import localforage from "localforage";
import { v4 as uuidv4 } from 'uuid';

localforage.config({
  name: "react-flow-docs",
  storeName: "flows",
});

const flowKey = "example-flow";

const initialNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 150, y: 100 } },
  { id: '3', data: { label: 'Node 2' }, position: { x: 250, y: 100 } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const edgeTypes = {
  custom: CustomEdge,
};

const ExampleGraph = () => {
  const [rfInstance, setRfInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [name, setName] = useState("");

  const onPrintElements = () => {

    console.log("Nodes: ", nodes);
    console.log("Edges: ", edges);
  };

  const addNode = () => {
    setNodes((e) =>
    {
      const node = {
        id: uuidv4(),
        data: { label: `${name}` },
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      }
      //setNodes((nds) => nds.concat(node));
      e.concat(node)
      //addNode(node, e);
    });
    console.log(nodes);
  };

  /*
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localforage.setItem(flowKey, flow);
      console.log(localforage.getItem(flowKey));
    }
  }, [rfInstance]);

  //////////////////////////////////////////////
  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = await localforage.getItem(flowKey);
      console.log(flow);

      if (flow) {
        const [x = 0, y = 0] = flow.position;
        setElements(flow.elements || []);
      }
    };

    restoreFlow();
  }, [setElements]);
  //////////////////////////////////////////////

  
  //////////////////////////////////////////////
  // Node position update after draging
  const onNodeDragStop = (event, node) => {
    let elementsCopy = elements;
    let index = elements.findIndex((element) => element.id === node.id);
    let newPositionNode = elements[index];
    newPositionNode.position = node.position;
    elementsCopy.splice(index, 1, newPositionNode);
    setElements(elementsCopy);
  };
  //////////////////////////////////////////////
  */
 
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const defaultEdgeOptions = {
    style: { strokeWidth: 2, stroke: 'black' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'black',
    },
  };

  return (
    <Fragment>
      <div style={{display: flex, flexDirection: row, flexWrap: wrap}}>
        <div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          //onLoad={setRfInstance}
          style={{ width: "100%", height: "80vh", border: "1px solid #16001E" }}
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
          //onNodeDragStop={onNodeDragStop}
          edgeTypes={edgeTypes}
        >
          <Background color="#888" gap={16} />
          <MiniMap
            style={{ border: "1px solid #16001E" }}
            nodeColor={(n) => {
              if (n.type === "input") return "blue";

              return "#FFCC00";
            }}
          />
          <Controls />
        </ReactFlow>
        <div>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            name="title"
          />
          <button type="button" onClick={addNode}>
            Add Node
          </button>
          
          <button
            type="button"
            onClick={onPrintElements}
            style={{ marginLeft: 1 }}
          >
            print elements
          </button>
        </div>
        </div>
        <div>
          <Sidebar />
        </div>
      </div>
    </Fragment>
  );
};

export default ExampleGraph;

/*
        <button type="button" onClick={onSave} style={{ marginLeft: 1 }}>
          Save graph
        </button>
        <button type="button" onClick={onRestore} style={{ marginLeft: 1 }}>
          Restore graph
        </button>
*/