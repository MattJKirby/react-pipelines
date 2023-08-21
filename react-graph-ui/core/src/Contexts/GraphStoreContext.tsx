import { createContext } from 'react';
import { createGraphStore } from '../Store';

type GraphStore = ReturnType<typeof createGraphStore>

const GraphStoreContext = createContext<GraphStore | null>(null);
export default GraphStoreContext;