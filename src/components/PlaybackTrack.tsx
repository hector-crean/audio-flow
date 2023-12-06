import * as Slider from '@radix-ui/react-slider';
import useAnimationFrame from "hooks/useAnimationFrame";
import React, { useCallback, useEffect, useState } from "react";
import { AudioBufferSourceNode, AudioContext } from 'utils/audioContext';
import styles from './PlaybackTrack.module.css';



interface Props {
    audioContext: AudioContext,
    node: AudioBufferSourceNode,
    paused: boolean
    when: number,
    offset: number,
    duration: number,
    setWhen: (when: number) => void;
    setOffset: (when: number) => void;
    startHandler: (when: number, offset: number) => void
    stopHandler: () => void

}

function PlaybackTrack({ audioContext, node, paused, when, offset, duration, setOffset, startHandler, stopHandler }: Props) {


    const [timeOrigin, setTimeOrigin] = useState(0)

    useEffect(() => setTimeOrigin(audioContext.currentTime), [audioContext])

    const draw = useCallback(() => {

    }, []);


    const updateTime = useCallback(() => {
        setOffset(audioContext.currentTime - timeOrigin)
    }, [audioContext, timeOrigin, setOffset]);

    const tick = useCallback(() => {
        if (!paused) {
            updateTime();
            draw();
        }
    }, [draw, updateTime, paused]);

    useAnimationFrame(tick);

    return (
        <form style={{ width: '100%', height: '100px' }}>
            <button onPointerDown={() => stopHandler()}>Stop</button>
            <button onPointerDown={() => startHandler(when, offset)}>Start</button>

            <Slider.Root className={styles["SliderRoot"]} max={duration} step={1} value={[offset]} onValueChange={(([start, _end]) => {
                startHandler(when, start)
                setTimeOrigin(audioContext.currentTime - start)
            }
            )}>
                <Slider.Track className={styles["SliderTrack"]}>
                    <Slider.Range className={styles["SliderRange"]} />
                </Slider.Track>
                <Slider.Thumb className={styles["SliderThumb"]} aria-label="Volume" />
            </Slider.Root>
        </form>
    )
}

const MemoedPlaybackTrack = React.memo(PlaybackTrack);

export default MemoedPlaybackTrack;