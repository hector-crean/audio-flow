import { ChangeEvent } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { RFlowAudioStore, useStore } from "../store";
import { OscillatorNodeAttributes } from "./nodes";




interface Props extends NodeProps<OscillatorNodeAttributes["data"]> { }

const selector = (id: string) => (store: RFlowAudioStore) => ({
  setFrequency: (e: ChangeEvent<HTMLInputElement>) => store.updateNode(id, { frequency: +e.target.value }),
  setType: (e: ChangeEvent<HTMLSelectElement>) => store.updateNode(id, { type: e.target.value }),
});

const OscillatorNode = ({ id, data }: Props) => {

  const { setFrequency, setType } = useStore(selector(id));




  return (
    <div >
      <p>
        Oscillator Node
      </p>

      <label>
        <p >Frequency</p>
        <input
          className="nodrag"
          type="range"
          min="10"
          max="1000"
          value={data.frequency}
          onChange={setFrequency}
        />
        <p >{data.frequency} Hz</p>
      </label>

      <hr />

      <label >
        <p >Waveform</p>
        <select className="nodrag" value={data.type} onChange={setType}>
          <option value="sine">sine</option>
          <option value="triangle">triangle</option>
          <option value="sawtooth">sawtooth</option>
          <option value="square">square</option>
        </select>
      </label>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export { OscillatorNode };

