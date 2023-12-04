// import type { GraphNode } from "@/models/graph";
import { type Node } from 'reactflow'

import { IAnalyserOptions, IAudioBufferSourceOptions, IBiquadFilterOptions, IChannelMergerOptions, IChannelSplitterOptions, IConstantSourceOptions, IConvolverOptions, IDelayOptions, IDynamicsCompressorOptions, IGainOptions, IIIRFilterOptions, IMediaElementAudioSourceOptions, IMediaStreamAudioSourceOptions, IOscillatorOptions, IPannerOptions, IStereoPannerOptions, IWaveShaperOptions, } from 'standardized-audio-context'

export type AnalyserNodeAttributes = { type: 'analyser-node', data: IAnalyserOptions }
export type AudioBufferSourceNodeAttributes = { type: 'audio-buffer-source-node', data: IAudioBufferSourceOptions }
export type BiquadFilterNodeAttributes = { type: 'biquad-filter-node', data: IBiquadFilterOptions }
export type ChannelMergeNodeAttributes = { type: 'channel-merge-node', data: IChannelMergerOptions }
export type ChannelSplitterNodeAttributes = { type: 'channel-splitter-node', data: IChannelSplitterOptions }
export type ContanceSourceNodeAttributes = { type: 'constance-source-node', data: IConstantSourceOptions }
export type ConvolverNodeAttributes = { type: 'convolver-node', data: IConvolverOptions }
export type DelayNodeAttributes = { type: 'delay-node', data: IDelayOptions }
export type DynamicCompressorNodeAttributes = { type: 'dynamic-compressor-node', data: IDynamicsCompressorOptions }
export type GainNodeAttributes = { type: 'gain-node', data: IGainOptions }
export type IifFilterNodeAttributes = { type: 'iir-filter-node', data: IIIRFilterOptions }
export type MediaElementSourceNodeAttributes = { type: 'media-element-source-node', data: IMediaElementAudioSourceOptions }
export type MediaStreamSourceNodeAttributes = { type: 'media-stream-source', data: IMediaStreamAudioSourceOptions }
export type OscillatorNodeAttributes = { type: 'oscillator-node', data: IOscillatorOptions }
export type PannerNodeAttributes = { type: 'panner-node', data: IPannerOptions }
export type StereoPannerNodeAttributes = { type: 'stereo-panner-node', data: IStereoPannerOptions }
export type WaveShaperNodeAttributes = { type: 'wave-shaper-node', data: IWaveShaperOptions }
export type OuputNodeAttributes = { type: 'output-node', data: { id: string} }

type AudioNodeAttributes =
    | AnalyserNodeAttributes
    | AudioBufferSourceNodeAttributes
    | BiquadFilterNodeAttributes
    | ChannelMergeNodeAttributes
    | ChannelSplitterNodeAttributes
    | ContanceSourceNodeAttributes
    | ConvolverNodeAttributes
    | DelayNodeAttributes
    | DynamicCompressorNodeAttributes
    | GainNodeAttributes
    | IifFilterNodeAttributes
    | MediaElementSourceNodeAttributes
    | MediaStreamSourceNodeAttributes
    | OscillatorNodeAttributes
    | PannerNodeAttributes
    | StereoPannerNodeAttributes
    | WaveShaperNodeAttributes
    | OuputNodeAttributes


    

type ExtractTypeAndData<T> = T extends { type: infer Type; data: infer Data } ? Type extends string ? Node<Data, Type> : never : never;



type AudioGraphNode = ExtractTypeAndData<AudioNodeAttributes>


export type { AudioGraphNode, AudioNodeAttributes }




