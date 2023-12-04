import { Handle, Position } from "reactflow";


import { RFlowAudioStore, useStore } from "../store";






const selector = (store: RFlowAudioStore) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

const OutputNode = () => {

  const { isRunning, toggleAudio } = useStore(selector);

  return (
    <div >
      <Handle type="target" position={Position.Top} />

      <button onClick={toggleAudio}>
        {isRunning ? (
          <span role="img" aria-label="mute">
            🔈
          </span>
        ) : (
          <span role="img" aria-label="unmute">
            🔇
          </span>
        )}
      </button>
    </div>
  );
}


export { OutputNode };
