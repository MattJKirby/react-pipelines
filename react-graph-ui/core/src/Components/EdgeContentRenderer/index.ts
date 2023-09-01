import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '../../Hooks/useStore';
import { IGraphState } from '../../Types';

const selector = (s: IGraphState) => s.domNode?.querySelector('.RP_EdgeContentRenderer');

const EdgeContentRenderer = ({ children }: { children: ReactNode }) => {
  const edgeLabelRenderer = useStore(selector);

  if (!edgeLabelRenderer) {
    return null;
  }

  return createPortal(children, edgeLabelRenderer);
}

export default EdgeContentRenderer;