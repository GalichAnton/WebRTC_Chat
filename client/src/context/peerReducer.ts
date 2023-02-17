import { type addPeerAction, type removePeerAction } from './peerActions';

export type PeerState = Record<string, { stream: MediaStream }>;
type PeerAction = ReturnType<typeof addPeerAction> | ReturnType<typeof removePeerAction>;

export const peerReducer = (state: PeerState, action: PeerAction) => {
  switch (action.type) {
    case 'ADD_PEER':
      return {
        ...state,
        [action.payload.peerId]: { stream: action.payload.stream },
      };
    case 'REMOVE_PEER':
      const { [action.payload.peerId]: deleted, ...rest } = state;
      return rest;
    default:
      return state;
  }
};
