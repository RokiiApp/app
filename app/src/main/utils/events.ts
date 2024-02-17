import { SelectEvent as ISelectEvent } from '@rokii/types';

export class SelectEvent extends Event implements ISelectEvent {
  altKey = false;
  ctrlKey = false;
  metaKey = false;
  shiftKey = false;
}

/**
 * Wrap click or mousedown event to custom `select-item` event,
 * that includes only information about clicked keys (alt, shift, ctrl and meta)
 */
export const wrapEvent = (
  realEvent:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLDivElement>
) => {
  const event = new SelectEvent('select-item', { cancelable: true });
  event.altKey = realEvent.altKey;
  event.shiftKey = realEvent.shiftKey;
  event.ctrlKey = realEvent.ctrlKey;
  event.metaKey = realEvent.metaKey;
  return event;
};
