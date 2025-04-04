import { createMachine, assign } from "xstate";

const chapterMachine = createMachine(
  {
    initial: "intro",
    // Set initial context including scene
    context: {
      introText: [],
      outroText: [],
      scene: [],
      currentText: {},
      lastText: [],
      cursorMode: true,
    },
    states: {
      idle: {
        after: {
          1000: {
            target: "intro",
          },
        },
      },
      intro: {
        entry: ["introDialogStep"],
        on: {
          NEXT: [
            {
              target: "intro",
              cond: "continueIntro",
            },
            {
              target: "experiment",
              cond: (context, event) => context.introText.length === 0,
            },
          ],
        },
      },
      introReading: {
        after: {
          3000: {
            target: "intro",
          },
        },
      },
      experiment: {
        on: {
          ADVANCE: {
            target: "outro",
          },
        },
      },
      outro: {
        entry: "outroDialogStep",
        on: {
          NEXT: [
            {
              target: "outro",
              cond: "continueOutro",
            },
            {
              target: "loadingNextChapter",
              actions: assign({
                currentText: (context) => ({
                  text: "Hit the next button to load the next chapter...",
                  speaker: "player",
                }),
                loaded: () => false,
              }),
            },
          ],
          // Update RESET_CONTEXT here to include scene
          RESET_CONTEXT: {
            actions: assign({
              introText: (_, event) => event.introText,
              outroText: (_, event) => event.outroText,
              scene: (_, event) => event.scene,
              currentText: (_, event) => event.introText[0] || null,
              lastText: () => [],
              cursorMode: (_, event) => event.cursorMode,
            }),
          },
        },
      },
      loadingNextChapter: {
        on: {
          RESET_CONTEXT: {
            target: "intro",
            actions: assign({
              introText: (_, event) => event.introText,
              outroText: (_, event) => event.outroText,
              scene: (_, event) => event.scene,
              currentText: (_, event) => event.introText[0] || null,
              lastText: () => [],
              cursorMode: (_, event) => event.cursorMode,
            }),
          },
        },
      },
    },
    // Global handler to catch RESET_CONTEXT no matter what state you're in
    on: {
      RESET_CONTEXT: {
        actions: assign({
          introText: (_, event) => event.introText,
          outroText: (_, event) => event.outroText,
          scene: (_, event) => event.scene,
          currentText: (_, event) => event.introText[0] || null,
          lastText: () => [],
          cursorMode: (_, event) => event.cursorMode,
        }),
      },
    },
  },
  {
    guards: {
      continueIntro: (context) => context.introText.length > 0,
      continueOutro: (context) => context.outroText.length > 0,
    },
    actions: {
      introDialogStep: assign({
        currentText: (context) => {
          if (context.introText[0]) {
            return context.introText[0];
          }
          if (context.currentText) {
            return context.currentText;
          }
          return {};
        },
        introText: (context) => {
          if (context.introText.length > 0) {
            return context.introText.slice(1);
          }
          return [];
        },
        lastText: (context) => {
          if (context.introText.length > 0) {
            return [...context.lastText, context.currentText];
          }
          return [];
        },
      }),
      toggleCursorMode: assign({
        cursorMode: (context) => !context.cursorMode,
      }),
      outroDialogStep: assign({
        currentText: (context) => {
          if (context.outroText[0]) {
            return context.outroText[0];
          }
          return {};
        },
        outroText: (context) => {
          if (context.outroText.length > 0) {
            return context.outroText.slice(1);
          }
          return [];
        },
        lastText: (context) => {
          if (context.outroText.length > 0) {
            return [...context.lastText, context.currentText];
          }
          return [];
        },
      }),
    },
  }
);

export default chapterMachine;
