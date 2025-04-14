import { createMachine, assign } from "xstate";

const chapterMachine = createMachine(
  {
    initial: "intro",
    context: {
      introText: [],
      outroText: [],
      scene: [],
      currentText: {},
      lastText: [],
      cursorMode: true,
      // The callback that will notify the parent when the intro is complete.
      onIntroComplete: () => {},
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
        entry: ["introDialogueStep"],
        on: {
          NEXT: [
            {
              target: "intro",
              cond: "continueIntro",
            },
            {
              // When there’s no more intro text, call the callback and enter the final "done" state.
              target: "done",
              cond: (context) => context.introText.length === 0,
              actions: "triggerOnIntroComplete",
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
      // Other states remain unchanged…
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
              target: "done",
              cond: (context) => context.outroText.length === 0,
              actions: "triggerOnOutroComplete",
            },
          ],
          RESET_CONTEXT: {
            actions: assign({
              introText: (_, event) => event.introText,
              outroText: (_, event) => event.outroText,
              scene: (_, event) => event.scene,
              currentText: (_, event) => event.isOutro ? event.outroText[0] || null : event.introText[0] || null,
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
              currentText: (_, event) => event.isOutro ? event.outroText[0] || null : event.introText[0] || null,
              lastText: () => [],
              cursorMode: (_, event) => event.cursorMode,
            }),
          },
        },
      },
      // This final state indicates that the intro is fully completed.
      done: {
        type: "final",
      },
    },
    on: {
      RESET_CONTEXT: {
        actions: assign({
          introText: (_, event) => event.introText,
          outroText: (_, event) => event.outroText,
          scene: (_, event) => event.scene,
          currentText: (_, event) => event.isOutro ? event.outroText[0] || null : event.introText[0] || null,
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
      introDialogueStep: assign({
        currentText: (context) => {
          console.log("Current introText before slicing:", context.introText);
          return context.introText[0] || {};
        },
        introText: (context) => {
          const sliced = context.introText.length > 0 ? context.introText.slice(1) : [];
          console.log("New introText after slicing:", sliced);
          return sliced;
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
          console.log("🎬 Running outroDialogStep with outroText:", context.outroText);
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
      triggerOnIntroComplete: (context) => {
        // Call the callback passed in via context.
        context.onIntroComplete();
      },
      triggerOnOutroComplete: (context) => {
        context.onOutroComplete?.();
      },      
    },
  }
);

export default chapterMachine;
