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
        NEWGAME: "newGame", //move to new game
        LEVELSELECT: "levelSelect", //move to edit level
        GAMESELECT: "gameSelect",
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
        EDIT: "edit", // move to edit
      },
    },
    edit: {
      on: {
        NEWLEVEL: "newLevel", // move to new level
      },
    },
    newGame : {
      on: {
        MAIN: "main", // move to home
        EDIT: "edit", // move to edit
        LEVELSELECT: "levelSelect", // move to conjecture selector
      },
    },
    levelSelect: {
      on: {
        NEWLEVEL: "newLevel", // move to new level
        NEWGAME: "newGame", // move to new game
        MAIN: "main", // move to home
      }
    },
    gameSelect: {
      on: {
        NEWGAME: "newGame", // move to new game
        MAIN: "main", // move to home
        PLAY: "play",
      }
    },
  }
});
