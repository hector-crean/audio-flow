import Node from "components/Node";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";
import React from "react";
import { NodeProps } from "reactflow";

function Sign({ id, type }: NodeProps) {
  useAudioWorkletNode(id, "sign-processor");

  return <Node id={id} inputs={["input"]} outputs={["output"]} title="Sign" type={type} />;
}

export default React.memo(Sign);
