import { TEventTargetFactoryFactory } from '../types';

export const createEventTargetFactory: TEventTargetFactoryFactory = () => {
  return () => {
    return new EventTargetPolyfill();
  };
};

class EventTargetPolyfill implements EventTarget {
  private listeners = new Map<string, Set<() => void>>();

  public addEventListener = (type: string, handler: () => void) => {
    const found = this.listeners.get(type);
    if (found !== undefined) {
      found.add(handler);
    } else {
      this.listeners.set(type, new Set([handler]));
    }
  }

  public dispatchEvent = (e: { type: string }) => {
    this.listeners.get(e.type)?.forEach(handler => handler());

    return true;
  }

  public removeEventListener = (type: string, handler: () => void) => {
    this.listeners.get(type)?.delete(handler);
  }
}
