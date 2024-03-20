import { createMachine, assign } from "xstate";

export const StoryMachine = createMachine({
  initial: "ready",
  context: {
    holistic: undefined,
  },
  states: {
    ready: {
      on: {
        TOGGLE: "main",  // move to game
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
        CONJECT: "conjecture", // move to home
      }
    },
    pose: {
      on: {
        HOME: "ready", // move to home
      }
    },
    main: {
      
    },
    playing: {},
    conjecture: {
      on: {
        AUTHOR: "edit", // move to poseauthoring
        HOME: "ready", // move to home
        TEST: "test"
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
