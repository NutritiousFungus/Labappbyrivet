import { useReducer } from 'react';

type ModalState = {
  showPendingArrivalModal: boolean;
  showCompletedThisWeekModal: boolean;
  showPartiallyCompleteModal: boolean;
  showInProcessModal: boolean;
  showAccountMenu: boolean;
  showAccountBalance: boolean;
  showBulkDownloadModal: boolean;
  showTeamSettings: boolean;
  showIntakeFlow: boolean;
  showBulkSubmission: boolean;
  showSamplingInstructions: boolean;
  showBulkSampleSubmission: boolean;
  showAccountSettings: boolean;
};

type ModalAction = 
  | { type: 'OPEN_MODAL'; modal: keyof ModalState }
  | { type: 'CLOSE_MODAL'; modal: keyof ModalState }
  | { type: 'TOGGLE_MODAL'; modal: keyof ModalState }
  | { type: 'CLOSE_ALL' };

const initialState: ModalState = {
  showPendingArrivalModal: false,
  showCompletedThisWeekModal: false,
  showPartiallyCompleteModal: false,
  showInProcessModal: false,
  showAccountMenu: false,
  showAccountBalance: false,
  showBulkDownloadModal: false,
  showTeamSettings: false,
  showIntakeFlow: false,
  showBulkSubmission: false,
  showSamplingInstructions: false,
  showBulkSampleSubmission: false,
  showAccountSettings: false,
};

function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, [action.modal]: true };
    case 'CLOSE_MODAL':
      return { ...state, [action.modal]: false };
    case 'TOGGLE_MODAL':
      return { ...state, [action.modal]: !state[action.modal] };
    case 'CLOSE_ALL':
      return initialState;
    default:
      return state;
  }
}

export function useModalState() {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = (modal: keyof ModalState) => dispatch({ type: 'OPEN_MODAL', modal });
  const closeModal = (modal: keyof ModalState) => dispatch({ type: 'CLOSE_MODAL', modal });
  const toggleModal = (modal: keyof ModalState) => dispatch({ type: 'TOGGLE_MODAL', modal });
  const closeAllModals = () => dispatch({ type: 'CLOSE_ALL' });

  return {
    ...state,
    openModal,
    closeModal,
    toggleModal,
    closeAllModals,
  };
}