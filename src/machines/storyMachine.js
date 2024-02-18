import { createMachine, assign } from "xstate";

export const StoryMachine = createMachine({
  initial: "ready",
  context: {
    holistic: undefined,
  },
  states: {
    ready: {
      on: {
        TOGGLE: "playing",  // move to game
        CONJECT: "conjecture", // move to conjecture editor
        POSE: "pose", // move to pose
        AUTHOR: "edit", // move to poseauthoring
        CURRICULAR: "curricular", // move to the curricular content editor
        TEST: "test", // move to test
        userManagementSettings : "userManagementSettings",
        ADDNEWUSER: "ADDNEWUSER"
      },
    },
    test: {
      on: {
        HOME: "ready", // move to home
      }
    },
    pose: {
      on: {
        HOME: "ready", // move to home
      }
    },
    playing: {},
    conjecture: {
      on: {
        AUTHOR: "edit", // move to poseauthoring
        HOME: "ready", // move to home
      }
    },
    edit: {
      on: {
        CONJECT: "conjecture", // move to conjecture editor
      }
    },
    curricular: {
      on: {
        CONJECT: "conjecture", // move to conjecture editor
        HOME: "ready", // move to home
      }
    },
    userManagementSettings:{
      on:{
        HOME: "ready",
        ADDNEWUSER: "ADDNEWUSER" // move to addnewuser screen
      }
    },
    ADDNEWUSER:{
      on:{
        userManagementSettings : "userManagementSettings" // go back to user settings screen
      }
    }
  },
});
