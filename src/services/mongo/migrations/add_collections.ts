/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';

import { Reply } from '../models/reply';
import { Intent } from '../models/intent';

const seedFile = `${__dirname}/intent_reply_seed_data.json`;
const seedData = JSON.parse(fs.readFileSync(seedFile, 'utf-8'));

/**
 * Simple Migration setup
 */
export async function up() {
  Promise.all([
    seedData.forEach(
      async (data: { reply: { text: any }; name: any; description: any }) => {
        const replyDocument = await new Reply({
          text: data.reply.text
        }).save();

        await new Intent({
          name: data.name,
          description: data.description,
          reply: replyDocument._id
        }).save();
      }
    )
  ]);
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down() {
  // Write migration here
  await Reply.remove();
  await Intent.remove();
}
