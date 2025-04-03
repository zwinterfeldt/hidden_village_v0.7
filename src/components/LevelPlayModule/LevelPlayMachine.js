import { createMachine } from "xstate";

const LevelPlayMachine =
  createMachine(
    {
      id: "levelPlay",
      initial: "introDialogue",
      states: {
        introDialogue: {
          on: {
            NEXT: "poseMatching",
          },
        },
        poseMatching: {
          on: {
            NEXT: "intuition",
          },
        },
        insight: {
          on: {
            NEXT: "levelEnd",
          },
        },
        intuition: {
          on: {
            NEXT: "insight",
          },
        },
        levelEnd: {
          type: "final",
        },
      },
    }
    
  );
export default LevelPlayMachine;
