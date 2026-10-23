export {handleMcp as default} from '../../lib/server.mjs';
export const config={path:'/mcp',rateLimit:{windowSize:60,windowLimit:120,aggregateBy:['ip','domain']}};
