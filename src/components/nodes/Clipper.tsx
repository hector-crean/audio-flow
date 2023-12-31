import Node from "components/Node";
import useWaveShaperNode from "hooks/nodes/useWaveShaperNode";
import React from "react";
import { NodeProps } from "reactflow";

const curve = new Float32Array([-1, 1]);

function Clipper({ id, type }: NodeProps) {
  // AudioNode
  useWaveShaperNode(id, { curve });

  return <Node id={id} inputs={["input"]} outputs={["output"]} type={type} />;
}

export default React.memo(Clipper);
