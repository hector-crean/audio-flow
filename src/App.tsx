import Audio from "components/Audio";
import ContextMenu from "components/ContextMenu";
import Flow from "components/Flow";
import Nodes from "components/Nodes";
import Project, { ProjectState, getEmptyProject } from "components/Project";
import { ProjectContext } from "context/ProjectContext";
import { graph } from 'data/simple';
import { produce } from "immer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ReactFlowProvider, useEdgesState, useNodesState } from "reactflow";

// default styling
import 'reactflow/dist/style.css';

// or if you just want basic styles
import 'reactflow/dist/base.css';


const App = () => {





  const defaultProject = useMemo(getEmptyProject, []);
  const [id, setId] = useState<ProjectState["id"]>(defaultProject.id);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes);
  const [transform, setTransform] = useState<ProjectState["transform"]>(defaultProject.transform);
  const onChangeElementFactory = useCallback(
    (id: string) =>
      (data: Record<string, any>): void => {
        setNodes(
          produce(draft => {
            const node = draft.find(element => element.id === id);
            if (!node) {
              return;
            }
            Object.keys(data).forEach(property => (node.data[property] = data[property]));
          })
        );
      },
    [setNodes]
  );
  const project = {
    edges,
    id,
    nodes,
    onChangeElementFactory,
    onEdgesChange,
    onNodesChange,
    setEdges,
    setId,
    setNodes,
    setTransform,
    transform,
  };

  const setProject = useCallback(
    (project: ProjectState) => {
      setEdges(project.edges);
      setId(project.id);
      setNodes(project.nodes);
      setTransform(project.transform);
    },
    [setEdges, setId, setNodes, setTransform]
  );
  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const projectUrl = params.get("project");
      if (projectUrl) {
        const project = await (await fetch(projectUrl)).json();
        setProject(project);
      }
    })();
  }, [setProject]);


  return (
    <ProjectContext.Provider value={project}>
      <Audio>
        <ReactFlowProvider>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Video />
            </div>
            <div style={{ width: "100%" }}>
              <Nodes>
                <ContextMenu>
                  <div
                    style={{
                      alignItems: "stretch",
                      display: "flex",
                      height: "100vh",
                    }}
                  >
                    <Flow key={project.id} />
                    <Project />
                  </div>
                </ContextMenu>
              </Nodes>
            </div>

          </div>
        </ReactFlowProvider>
      </Audio>
    </ProjectContext.Provider>
  );
}

export default App;



const Video = () => {


  return (
    <div style={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      <video controls style={{ width: '100%' }} src='https://pub-96d1d56fbc0e4812805ac1bc8104bd03.r2.dev/2023/09/Hero_Loop_A_HiRes.mp4' />
    </div>


  )
}