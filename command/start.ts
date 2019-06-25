import { sendMessage, EnumParseMode, Message } from '../utils';
import { startMdTemplate } from '../template';

type StartCommand<T> = (chatId: number) => Promise<T>;
const start: StartCommand<Message> = chatId =>
  sendMessage({ chat_id: chatId, text: startMdTemplate, parse_mode: EnumParseMode.markdown });

export { start, startMdTemplate };
