import {health} from '../../lib/server.mjs';
export default health;
export const config={path:'/health',rateLimit:{windowSize:60,windowLimit:120,aggregateBy:['ip','domain']}};
