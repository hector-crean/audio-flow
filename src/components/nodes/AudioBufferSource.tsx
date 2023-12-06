import Node from "components/Node";
import PlaybackTrack from 'components/PlaybackTrack';
import { useAudioContext } from "context/AudioContextContext";
import { useNode } from "context/NodeContext";
import React, { ChangeEventHandler, DragEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { NodeProps } from "reactflow";
import { IAudioBufferSourceOptions } from 'standardized-audio-context';
import { AudioBufferSourceNode } from "utils/audioContext";

interface AudioBufferSourceStartParams {
  // The time, in seconds, at which the sound should begin to play, 
  // in the same time coordinate system used by the AudioContext.
  when?: number;
  // An offset, specified as the number of seconds in the same time coordinate system 
  // as the AudioContext, to the time within the audio buffer that playback should begin. 
  offset?: number;
  // The duration of the sound to be played, specified in seconds. If this parameter isn't 
  // specified, the sound plays until it reaches its natural conclusion or is stopped 
  // using the stop()
  duration?: number
}



type AudioBufferSourceNodeData = IAudioBufferSourceOptions & { audioFilePath?: string } & AudioBufferSourceStartParams;

function AudioBufferSource({ data, id, selected, type, }: NodeProps<AudioBufferSourceNodeData>) {


  const activeBufferSource = useRef<AudioBufferSourceNode>();

  const audioContext = useAudioContext()

  const [paused, setPaused] = useState(false);


  // TODO buffer source -> gain and swap buffer
  // AudioNode
  const node = useNode(id, context => context.createGain());

  const [when, setWhen] = useState(0)
  const [offset, setOffset] = useState(0)
  const [duration, setDuration] = useState(0)





  // Add state for seek time

  useEffect(() => {
    setOffset(data.offset ?? 0)
    setWhen(data.when ?? 0)
  }, [data.duration, data.offset, data.when])


  const linkBufferSource = useCallback(
    (bufferSource: AudioBufferSourceNode) => {
      // cleanup previous
      activeBufferSource.current?.disconnect();
      activeBufferSource.current = bufferSource;

      // start new
      activeBufferSource.current.connect(node);

      setDuration(bufferSource.buffer?.duration ?? 0)

    },
    [node]
  );
  const startHandler = useCallback((when: number, offset: number) => {
    if (!activeBufferSource.current) {
      return;
    }

    const bufferSource = node.context.createBufferSource();
    bufferSource.buffer = activeBufferSource.current.buffer;

    linkBufferSource(bufferSource);
    activeBufferSource.current.start(when, offset); // Use seekTime here
    setOffset(offset)
    setWhen(when)

    setPaused(false)

  }, [node, linkBufferSource]);

  const stopHandler = useCallback(() => {
    activeBufferSource.current?.stop();
    setPaused(true)

  }, []);


  const handleNewFileFn = async (file: File) => {
    const bufferSource = node.context.createBufferSource();
    bufferSource.buffer = await node.context.decodeAudioData(await file.arrayBuffer());

    linkBufferSource(bufferSource);
  }

  const handleNewFile = useCallback(handleNewFileFn,
    [node, linkBufferSource]
  );



  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      e.preventDefault();
      if (e.target.files) {
        handleNewFile(e.target.files[0]);
      }
    },
    [handleNewFile]
  );
  const handleDragOver: DragEventHandler<HTMLDivElement> = useCallback(e => void e.preventDefault(), []);

  const handleDrop: DragEventHandler<HTMLDivElement> = useCallback(
    async e => {
      e.preventDefault();
      const file = [...e.dataTransfer.items]
        .filter((item: DataTransferItem) => item.kind === "file")[0]
        .getAsFile();
      if (file) {
        handleNewFile(file);
      }
    },
    [handleNewFile]
  );



  useEffect(() => {
    const createFile = async (path: string, name: string, type: string): Promise<File> => {
      try {
        const response = await fetch(path);

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Error fetching file: ${response.statusText}`);
        }

        const data = await response.blob();
        const metadata = { type: type };
        return new File([data], name, metadata);
      } catch (error) {
        console.error('Error creating file:', error);
        throw error; // Or handle the error as needed
      }
    };

    const fetchAndProcessFile = async () => {
      if (data.audioFilePath) {
        try {
          const file = await createFile(data.audioFilePath, 'audiofile', 'audio/mpeg');
          await handleNewFile(file);
        } catch (error) {
          console.error('Error processing file:', error);
        }
      }
    };

    fetchAndProcessFile().then(
      () => console.log('file fetched and processed'),
      () => console.log('file failed to load')
    );

  }, [handleNewFile, data.audioFilePath]);








  return (
    <Node
      id={id}
      outputs={["output"]}
      title="Buffer Source"
      type={type}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="customNode_editor nodrag">

        {selected && (
          <>
            <div className="customNode_item">
              <input onChange={handleChange} type="file" />
            </div>
            <div className="customNode_item">

              <PlaybackTrack audioContext={audioContext} node={node} when={when} offset={offset} duration={duration} setOffset={setOffset} setWhen={setWhen} paused={paused} startHandler={startHandler} stopHandler={stopHandler} />
            </div>
          </>
        )}
      </div>
    </Node>
  );
}

const MemoedAudioBufferSource = React.memo(AudioBufferSource);

export default MemoedAudioBufferSource;
