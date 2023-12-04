import { nanoid } from "nanoid";
import { Connection, Edge, Node, OnConnect, OnEdgesChange, OnEdgesDelete, OnNodesChange, OnNodesDelete, applyEdgeChanges, applyNodeChanges } from "reactflow";
import { create } from "zustand";

import { DirectedGraph } from "graphology";
import { AudioContext, IAudioContext, IAudioNode, IGainOptions, IOscillatorOptions } from "standardized-audio-context";
import { Entries } from "type-fest";
import { AudioNodeAttributes, GainNodeAttributes, OscillatorNodeAttributes } from "./nodes/nodes";



//utils:

const isRunning = (ctx: IAudioContext) => ctx.state === 'running';




const toggleAudio = (ctx: IAudioContext): Promise<void> => {
    return isRunning(ctx) ? ctx.suspend() : ctx.resume();
};



const createAudioNode = (ctx: IAudioContext, dag: DirectedGraph<IAudioNode<IAudioContext>>, id: string, attr: AudioNodeAttributes) => {
    const { type, data } = attr;
    switch (type) {
        case 'oscillator-node': {
            const node = ctx.createOscillator()
            console.log(node)

            

            
            
            node.frequency.value = data.frequency;
            node.type = data.type;
            node.start();
            dag.addNode(id, node);
            break;
        }

        case 'gain-node': {
            const node = ctx.createGain();
            const currentTime = ctx.currentTime;
            // node.gain.setValueAtTime(data.gain, currentTime);
            node.gain.linearRampToValueAtTime(data.gain, currentTime + 0.5);


            dag.addNode(id, node);
            break;
        }
    }
};

const updateAudioNode = (dag: DirectedGraph<IAudioNode<IAudioContext>>, id: string, data: AudioNodeAttributes['data']) => {
    const node = dag.getNodeAttributes(id);

    node.

};

const removeAudioNode = (dag: DirectedGraph<IAudioNode<IAudioContext>>, id: string) => {
    const node = dag.getNodeAttributes(id);
    node.disconnect();
    dag.dropNode(id);
};

const connect = (dag: DirectedGraph<IAudioNode<IAudioContext>>, sourceId: string, targetId: string) => {
    const source = dag.getNodeAttributes(sourceId);
    const target = dag.getNodeAttributes(targetId);
    dag.addEdge(sourceId, targetId, {});
    source.connect(target);
};

const disconnect = (dag: DirectedGraph<IAudioNode<IAudioContext>>, sourceId: string, targetId: string) => {
    const source = dag.getNodeAttributes(sourceId);
    const target = dag.getNodeAttributes(targetId);
    dag.dropEdge(sourceId, targetId);
    source.disconnect(target);
};





// state : 

interface RFlowAudioStore {
  nodes: Node<AudioNodeAttributes['data']>[],
  edges: Edge[],
  isRunning: boolean,
  toggleAudio: () => void;
  onNodesChange: OnNodesChange,
  onEdgesChange: OnEdgesChange,
  createNode(nodeAttrs: AudioNodeAttributes, x: number, y: number): void;
  updateNode(id: string, data: AudioNodeAttributes['data']): void
  onNodesDelete: OnNodesDelete
  addEdge: OnConnect,
  onEdgesDelete: OnEdgesDelete
}


export const useStore = create<RFlowAudioStore>((set, get) => {



  const ctx = new AudioContext();

  const dag = new DirectedGraph<IAudioNode<IAudioContext>>();
  dag.addNode('output-node', ctx.destination)




  return ({
    nodes: [
      { id: "output-node", type: 'output-node', position: { x: 0, y: 0 }, data: ctx.destination},
    ],
    edges: [
  
    ],
    isRunning: isRunning(ctx),
  
    toggleAudio() {
      toggleAudio(ctx).then(() => {
        set({ isRunning: isRunning(ctx) });
      });
    },
  
    onNodesChange(changes) {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange(changes) {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
  
    createNode({type, data}, x, y) {
      const id = nanoid();
  
  
      switch (type) {
        
        case 'oscillator-node': {
          const position = { x: 0, y: 0 };
          const attr: OscillatorNodeAttributes = {type: 'oscillator-node', data };
  
          createAudioNode(ctx, dag, id, attr);
  
          const rflowNode: Node<IOscillatorOptions> = { id, type: attr.type, data: attr.data, position };
  
          set(({nodes}) => ({ nodes: [...nodes, rflowNode]}));
  
          break;
        }
  
        case 'gain-node': {
          const position = { x: 0, y: 0 };
  
          const attr: GainNodeAttributes = {type: 'gain-node', data}
  
          createAudioNode(ctx, dag, id, attr);
  
          const rflowNode: Node<IGainOptions> = { id, type: attr.type, data: attr.data, position };
  
          set(({nodes}) => ({ nodes: [...nodes, rflowNode]}));
  
  
  
          break;
        }
      }
    },
  
    updateNode(id: string, data: AudioNodeAttributes['data']) {
      updateAudioNode(dag, id, data);
      set({
        nodes: get().nodes.map((node) =>
          node.id === id
            ? { ...node, data: Object.assign(node.data, data) }
            : node
        ),
      });
    },
  
    onNodesDelete(deleted:  Array<Node>) {
      for (const { id } of deleted) {
        removeAudioNode(dag, id);
      }
    },
  
  
    addEdge(connection: Connection) {
      if(connection.source && connection.target) {
        const id = nanoid();
        const edge: Edge = { id, source: connection.source, target: connection.target }
        connect(dag, edge.source, edge.target);
        set({ edges: [edge, ...get().edges] });
      }
    },
  
    onEdgesDelete(deleted: Array<Edge>) {
      for (const { source, target } of deleted) {
        disconnect(dag, source, target);
      }
    },
  })
})



/// functions


export type { RFlowAudioStore };
