import holdout from 'assets/sam-fender-hold-out.mp3';

const graph = {
  "edges": [
    {
      "source": "AudioBufferSource-81882ff1-0f98-4504-85fc-77148ddc8351",
      "sourceHandle": "output",
      "target": "Gain-7b32593a-e9b9-4a87-8f1c-9c295530374c",
      "targetHandle": "input",
      "style": {
        "stroke": "#dc8351"
      },
      "id": "reactflow__edge-AudioBufferSource-81882ff1-0f98-4504-85fc-77148ddc8351output-Gain-7b32593a-e9b9-4a87-8f1c-9c295530374cinput",
      "selected": false
    },
    {
      "source": "AudioBufferSource-72150712-f601-4109-9a9e-be3132f7cf63",
      "sourceHandle": "output",
      "target": "Gain-1a1104ca-7b37-4449-86e4-513e0854203d",
      "targetHandle": "input",
      "style": {
        "stroke": "#f7cf63"
      },
      "id": "reactflow__edge-AudioBufferSource-72150712-f601-4109-9a9e-be3132f7cf63output-Gain-1a1104ca-7b37-4449-86e4-513e0854203dinput",
      "selected": false
    },
    {
      "source": "AudioBufferSource-3c536a59-99a3-4b39-b00e-3f205eb93ae2",
      "sourceHandle": "output",
      "target": "Gain-825fced6-f474-4655-80ee-a225a0ed5ef4",
      "targetHandle": "input",
      "style": {
        "stroke": "#b93ae2"
      },
      "id": "reactflow__edge-AudioBufferSource-3c536a59-99a3-4b39-b00e-3f205eb93ae2output-Gain-825fced6-f474-4655-80ee-a225a0ed5ef4input",
      "selected": false
    },
    {
      "source": "Gain-7b32593a-e9b9-4a87-8f1c-9c295530374c",
      "sourceHandle": "output",
      "target": "Gain-14ab8f34-68ce-4549-8d29-b4f127e74cf1",
      "targetHandle": "input",
      "style": {
        "stroke": "#30374c"
      },
      "id": "reactflow__edge-Gain-7b32593a-e9b9-4a87-8f1c-9c295530374coutput-Gain-14ab8f34-68ce-4549-8d29-b4f127e74cf1input",
      "selected": false
    },
    {
      "source": "Gain-1a1104ca-7b37-4449-86e4-513e0854203d",
      "sourceHandle": "output",
      "target": "Gain-14ab8f34-68ce-4549-8d29-b4f127e74cf1",
      "targetHandle": "input",
      "style": {
        "stroke": "#54203d"
      },
      "id": "reactflow__edge-Gain-1a1104ca-7b37-4449-86e4-513e0854203doutput-Gain-14ab8f34-68ce-4549-8d29-b4f127e74cf1input",
      "selected": false
    },
    {
      "source": "Gain-14ab8f34-68ce-4549-8d29-b4f127e74cf1",
      "sourceHandle": "output",
      "target": "Destination-3c0d9b04-96d4-46da-8f3e-caf33dcf0cee",
      "targetHandle": "input",
      "style": {
        "stroke": "#e74cf1"
      },
      "id": "reactflow__edge-Gain-14ab8f34-68ce-4549-8d29-b4f127e74cf1output-Destination-3c0d9b04-96d4-46da-8f3e-caf33dcf0ceeinput",
      "selected": false
    },
    {
      "source": "Gain-825fced6-f474-4655-80ee-a225a0ed5ef4",
      "sourceHandle": "output",
      "target": "Destination-3c0d9b04-96d4-46da-8f3e-caf33dcf0cee",
      "targetHandle": "input",
      "style": {
        "stroke": "#ed5ef4"
      },
      "id": "reactflow__edge-Gain-825fced6-f474-4655-80ee-a225a0ed5ef4output-Destination-3c0d9b04-96d4-46da-8f3e-caf33dcf0ceeinput",
      "selected": false
    }
  ],
  "nodes": [
    {
      "id": "Destination-3c0d9b04-96d4-46da-8f3e-caf33dcf0cee",
      "data": {},
      "type": "Destination",
      "position": {
        "x": 1620,
        "y": 430
      },
      "width": 79,
      "height": 50,
      "selected": false,
      "dragging": false,
      "positionAbsolute": {
        "x": 1620,
        "y": 430
      }
    },
    {
      "id": "AudioBufferSource-81882ff1-0f98-4504-85fc-77148ddc8351",
      "data": {
        "audioFilePath": holdout,
        "when": 10,
        "offset": 0,
      },
      "type": "AudioBufferSource",
      "position": {
        "x": 850,
        "y": 170
      },
      "width": 100,
      "height": 90,
      "selected": false,
      "positionAbsolute": {
        "x": 850,
        "y": 170
      },
      "dragging": false
    },
    {
      "id": "AudioBufferSource-3c536a59-99a3-4b39-b00e-3f205eb93ae2",
      "data": {
        "audioFilePath": holdout,
        "when": 5,
        "offset": 0,
      },
      "type": "AudioBufferSource",
      "position": {
        "x": 860,
        "y": 560
      },
      "width": 100,
      "height": 90,
      "selected": false,
      "positionAbsolute": {
        "x": 860,
        "y": 560
      },
      "dragging": false
    },
    {
      "id": "AudioBufferSource-72150712-f601-4109-9a9e-be3132f7cf63",
      "data": {
        "audioFilePath": holdout,
        "when": 2,
        "offset": 0,
      },
      "type": "AudioBufferSource",
      "position": {
        "x": 850,
        "y": 320
      },
      "width": 100,
      "height": 90,
      "selected": false,
      "positionAbsolute": {
        "x": 850,
        "y": 320
      },
      "dragging": false
    },
    {
      "id": "Gain-1a1104ca-7b37-4449-86e4-513e0854203d",
      "data": {},
      "type": "Gain",
      "position": {
        "x": 1040,
        "y": 310
      },
      "width": 120,
      "height": 70,
      "selected": false,
      "positionAbsolute": {
        "x": 1040,
        "y": 310
      },
      "dragging": false
    },
    {
      "id": "Gain-825fced6-f474-4655-80ee-a225a0ed5ef4",
      "data": {},
      "type": "Gain",
      "position": {
        "x": 1050,
        "y": 570
      },
      "width": 120,
      "height": 70,
      "selected": false,
      "positionAbsolute": {
        "x": 1050,
        "y": 570
      },
      "dragging": false
    },
    {
      "id": "Gain-14ab8f34-68ce-4549-8d29-b4f127e74cf1",
      "data": {},
      "type": "Gain",
      "position": {
        "x": 1270,
        "y": 240
      },
      "width": 120,
      "height": 70,
      "selected": false,
      "positionAbsolute": {
        "x": 1270,
        "y": 240
      },
      "dragging": false
    },
    {
      "id": "Gain-7b32593a-e9b9-4a87-8f1c-9c295530374c",
      "data": {},
      "type": "Gain",
      "position": {
        "x": 1040,
        "y": 170
      },
      "width": 120,
      "height": 70,
      "selected": false,
      "positionAbsolute": {
        "x": 1040,
        "y": 170
      },
      "dragging": false
    }
  ],
  "id": "05c54c2a-fca4-4307-96b2-a4044072a6af",
  "transform": {
    "x": -318.59274255777734,
    "y": 188.8551704702875,
    "zoom": 0.639936206922154
  }
}


export { graph };


