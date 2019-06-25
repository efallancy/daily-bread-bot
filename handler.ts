import axios from 'axios';
import * as dayjs from 'dayjs';

import { command } from './command';
import { getCurrentEpochTime, scanCachedVerse, putCachedVerse } from './utils';

// Resource updater
const update = async (event, ctx, callback): Promise<void> => {
  const currentEpochTime = getCurrentEpochTime();

  const result = await scanCachedVerse(currentEpochTime).catch(e => {
    console.error(`Fail to scan: ${e.message}`);
    return callback(e);
  });

  if (result.Count) {
    callback(null, { message: 'Cache valid' });
  } else {
    const rawVerse = await axios.get('https://quotes.rest/bible/vod.json').catch(e => {
      console.error(`Error in fetching resource: ${e.message}`);
      return new Error('Fail in fetching resource');
    });

    if (rawVerse instanceof Error) {
      return callback(rawVerse);
    }

    const { contents } = rawVerse.data;
    const expiredCacheEpochTime = dayjs()
      .add(1, 'hour')
      .valueOf(); // unix in ms
    const verse = { ...contents, expiredCacheEpochTime };

    const cachedVerseResult = await putCachedVerse(verse).catch(e => {
      console.error(`Error in updating cache: ${e.message}`);
      return new Error('Fail to update cache');
    });

    if (cachedVerseResult instanceof Error) {
      return callback(cachedVerseResult);
    }

    callback(null, { message: 'Verse cached' });
  }
};

interface Response {
  statusCode: number;
  body: string;
}

const respondWithSuccess = (isSuccessful = true): Response => ({
  statusCode: isSuccessful ? 200 : 400,
  body: JSON.stringify({ message: isSuccessful ? 'Request processed' : 'Invalid request made' }),
});

// Webhook function
const webhook = async (event, ctx, callback): Promise<void> => {
  // Validate identifier
  if (event.pathParameters.key === process.env.WEBHOOK_KEY) {
    const body = JSON.parse(event.body);
    const { text, chat } = body.message;

    // Only entertain update
    if (text) {
      const [commandText] = text.split(' '); // Split by space
      await command(commandText, chat.id);
    }

    callback(null, respondWithSuccess());
  } else {
    callback(null, respondWithSuccess(false));
  }
};

export { update, webhook };
