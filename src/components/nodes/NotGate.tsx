import Node from "components/Node";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";
import React from "react";
import { NodeProps } from "reactflow";

function NotGate({ id, type }: NodeProps) {
  useAudioWorkletNode(id, "not-gate-processor");

  return <Node id={id} inputs={["input"]} outputs={["output"]} title="Gate: NOT" type={type} />;
}

export default React.memo(NotGate);
