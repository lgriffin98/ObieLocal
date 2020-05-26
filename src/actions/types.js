// Specifying action types allowed in the app

/** Redux action: Change sidepane tabs */
export const CHANGE_TAB = 'CHANGE_TAB';
/** Redux action: Sets events from database */
export const GET_ALL_MARKERS = 'GET_ALL_MARKERS';
/** Redux action: Set the selected events to the clicked marker */
export const SET_SELECTED_EVENTS = 'SET_SELECTED_EVENTS';
/** Redux action: Pop in and out sidepane */
export const TOGGLE_SIDE_PANE = 'TOGGLE_SIDE_PANE';
/** Redux action: Focus and zoom map to a coordinates */
export const RECENTER_MAP = 'RECENTER_MAP';
/** Redux action: Move between different events stored in one marker (events happening at the same location) */
export const TOGGLE_EVENT = 'TOGGLE_EVENT';
/** Redux action: Set day to filter events */
export const FILTER_BY_DAY = 'FILTER_BY_DAY'