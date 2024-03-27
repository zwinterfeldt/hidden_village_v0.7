import { createMachine, assign } from 'xstate';

const PlayGameMachine = createMachine({
  id: 'conjecture',
  initial: 'idle',
  context: {
    uuids: [],
    uuidIndex: 0
  },
  states: {
    idle: {
      on: {
        LOAD_NEXT: {
          target: 'loading',
          actions: ['loadNextUuid']
        }
      }
    },
    loading: {
      on: {
        RETRY: 'loading',
        '': [
          {
            target: 'idle',
            cond: (context) => context.uuidIndex <= context.uuids.length - 1
          },
          {
            target: 'end',
            cond: (context) => context.uuidIndex > context.uuids.length - 1
          }
        ]
      }
    },
    end:{
      type: 'final'
    }
  }
}, {
  actions: {
    loadNextUuid: assign({
      uuidIndex: (context) => (context.uuidIndex + 1)
    })
  }
});

export default PlayGameMachine;
