import type { Video } from '../../types';
import { video as eggPcReview } from './egg-pc-review';
import { video as workshopBlocks } from './workshop-blocks';

export const videos: Video[] = [
  eggPcReview,
  workshopBlocks,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());