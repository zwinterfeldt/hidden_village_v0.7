import { createMachine, assign } from "xstate";

export const PlayMenuMachine = createMachine({
  initial: "main",
  context: {
    holistic: undefined,
  },
  states: {
    main: {
      on: {
        NEWLEVEL: "newLevel", // move to new level
        PLAY: "play", // move to play
        SETTINGS: "settings", // move to settings
        ADMIN: "admin", // move to admin
      },
    },
    settings: {
      on: {
        MAIN: "main", // move to home
      },
    },
    admin: {
      on: {
        MAIN: "main", // move to home
        ADDNEWUSER: "addNewUser", // move to add new user
      },
    },
    addNewUser: {
      on: {
        ADMIN: "admin", // move to admin
      },
    },
    play: {
      on: {
        MAIN: "main", // move to home
      },
    },
    newLevel: {
      on: {
        MAIN: "main", // move to home
      },
    },
    }
});
