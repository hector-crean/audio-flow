import Node from "components/Node";
import { useNode } from "context/NodeContext";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";
import React from "react";
import { NodeProps } from "reactflow";
import { Parameters } from "worklets/sample-and-hold-processor.types";

function SampleAndHold({ id, type }: NodeProps) {
  const workletNode = useAudioWorkletNode(`${id}_worklet`, "sample-and-hold-processor");

  useNode(
    id,
    () => ({
      [Parameters.HoldTime]: workletNode.parameters.get(Parameters.HoldTime),
      input: workletNode,
      output: workletNode,
    }),
    [workletNode]
  );

  return <Node id={id} inputs={["input", Parameters.HoldTime]} outputs={["output"]} title="Sample/Hold" type={type} />;
}

export default React.memo(SampleAndHold);
