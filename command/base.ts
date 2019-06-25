import { sendMessage, EnumParseMode, Message } from '../utils';
import { baseMdTemplate } from '../template';

type BaseCommand<T> = (chatId: number) => Promise<T>;
const base: BaseCommand<Message> = async chatId => {
  return sendMessage({ chat_id: chatId, text: baseMdTemplate, parse_mode: EnumParseMode.markdown });
};

export { base };
