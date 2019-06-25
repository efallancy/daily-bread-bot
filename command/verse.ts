import { getCurrentEpochTime, sendMessage, scanCachedVerse, EnumParseMode, Message, Verse } from '../utils';
import { verseMdTemplate, verseDefaultMdTemplate } from '../template';

type VerseCommand<T> = (chatId: number) => Promise<T>;
const verse: VerseCommand<Message> = async chatId => {
  const scanResult = await scanCachedVerse(getCurrentEpochTime());
  const cachedItems: unknown = scanResult.Items;

  let text = verseDefaultMdTemplate;
  if (Array.isArray(cachedItems) && cachedItems.length) {
    text = verseMdTemplate(cachedItems[0] as Verse);
  }

  return sendMessage({ chat_id: chatId, text, parse_mode: EnumParseMode.markdown });
};

export { verse };
