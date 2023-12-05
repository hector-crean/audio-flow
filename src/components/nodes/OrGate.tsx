import Node from "components/Node";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";
import React from "react";
import { NodeProps } from "reactflow";

function OrGate({ id, type }: NodeProps) {
  useAudioWorkletNode(id, "or-gate-processor", { numberOfInputs: 2 });

  return <Node id={id} inputs={["input-0", "input-1"]} outputs={["output"]} title="Gate: OR" type={type} />;
}

export default React.memo(OrGate);
