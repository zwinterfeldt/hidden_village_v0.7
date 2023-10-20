import { createMachine, assign } from "xstate";

export const PoseAuthMachine = createMachine({
  initial: "start",
  context: {
    holistic: undefined,
  },
  states: {
    start: {
      on: {
        INTERMEDIATE: "intermediate",
        END: "end",
      },
    },
    intermediate: {
        on: {
            START: "start",
            END: "end",
        },
    },
    end: {
        on: {
            START: "start",
            INTERMEDIATE: "intermediate",
        },
    },
  },
});
