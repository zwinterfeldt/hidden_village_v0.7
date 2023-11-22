import { createMachine, assign } from "xstate";

export const ConjectureEditorMachine = createMachine({
  initial: "optiona",
  context: {
    holistic: undefined,
  },
  states: {
    optiona: {
      on: {
        OPTIONB: "optionb",
        OPTIONC: "optionc",
        OPTIOND: "optiond",
      },
    },
    optionb: {
        on: {
            OPTIONA: "optiona",
            OPTIONC: "optionc",
            OPTIOND: "optiond",
        },
    },
    optionc: {
        on: {
            OPTIONA: "optiona",
            OPTIONB: "optionb",
            OPTIOND: "optiond",
        },
    },
    optiond: {
        on: {
            OPTIONA: "optiona",
            OPTIONB: "optionb",
            OPTIONC: "optionc",
        },
    },
  },
});
