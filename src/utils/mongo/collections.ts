import { History } from '@/types/history';

import { getMongoDB } from './get-mongo-db';

export const collections = {
  history: async () => await getMongoDB().then((db) => db.collection<History>('history')),
};
