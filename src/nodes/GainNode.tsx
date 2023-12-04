import { ChangeEvent } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { GainNodeAttributes } from "./nodes";

import { RFlowAudioStore, useStore } from "../store";


const selector = (id: string) => (store: RFlowAudioStore) => ({
  setGain: (e: ChangeEvent<HTMLInputElement>) =>
    store.updateNode(id, { gain: +e.target.value }),
});


interface Props extends NodeProps<GainNodeAttributes["data"]> { }


const GainNode = ({ id, data }: Props) => {
  const { setGain } = useStore(selector(id));

  return (
    <div >

      <Handle type="target" position={Position.Top} />
      <p>
        Gain Node
      </p>
      <label>
        <p >Gain</p>
        <input
          className="nodrag"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={data.gain}
          onChange={setGain}
        />
        <p>{data.gain?.toFixed(2)}</p>
      </label>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export { GainNode };

