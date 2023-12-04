import ReactFlow, {
  Background,
  NodeProps,
  Panel
} from "reactflow";

import { ComponentType, useMemo } from "react";
import "reactflow/dist/style.css";
import { IGainOptions, IOscillatorOptions } from "standardized-audio-context";
import { GainNode } from "./nodes/GainNode";
import { OscillatorNode } from "./nodes/OscillatorNode";
import { OutputNode } from "./nodes/OutputNode";
import { AudioNodeAttributes, } from "./nodes/nodes";
import { RFlowAudioStore, useStore } from "./store";


type NodeLibrary = {
  [key in AudioNodeAttributes["type"]]?: ComponentType<NodeProps<AudioNodeAttributes['data']>>;
};

// type EdgeLibrary = {
//   [key in AudioGraphEdgeAttributes["type"]]?: ComponentType<EdgeProps>;
// };





const selector = (store: RFlowAudioStore) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onNodesDelete: store.onNodesDelete,
  onEdgesChange: store.onEdgesChange,
  onEdgesDelete: store.onEdgesDelete,
  addEdge: store.addEdge,
  addOscillatorNode: (data: IOscillatorOptions) => store.createNode({ type: 'oscillator-node', data }, 0, 0),
  addGainNode: (data: IGainOptions) => store.createNode({ type: 'gain-node', data }, 1, 1),
});

export default function App() {

  const store = useStore(selector);


  const nodeTypes: NodeLibrary = useMemo(
    () => ({
      "oscillator-node": OscillatorNode,
      "output-node": OutputNode,
      "gain-node": GainNode,
    }),
    []
  );

  console.log(store.nodes)

  // const edgeTypes: EdgeLibrary = useMemo(
  //   () => ({
  //     "progress-edge": ProgressEdgeView,
  //   }),
  //   []
  // );


  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={store.nodes}
      edges={store.edges}
      onNodesChange={store.onNodesChange}
      onNodesDelete={store.onNodesDelete}
      onEdgesChange={store.onEdgesChange}
      onEdgesDelete={store.onEdgesDelete}
      onConnect={store.addEdge}
      fitView
    >
      <Panel position="top-right">
        <button

          onClick={() => store.addOscillatorNode({ detune: 1, frequency: 1, type: 'sawtooth', channelCount: 1, channelCountMode: 'explicit', channelInterpretation: 'discrete' })}
        >
          Add Osc
        </button>
        <button

          onClick={() => store.addGainNode({ gain: 1, channelCount: 1, channelCountMode: 'explicit', channelInterpretation: 'discrete' })}
        >
          Add Amp
        </button>
      </Panel>
      <Background />
    </ReactFlow>
  );
}
