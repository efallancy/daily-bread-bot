import { start } from './start';
import { verse } from './verse';
import { base } from './base';
import { Message } from '../utils';

type Command<T> = (commandText: string, chatId: number) => Promise<T>;
const command: Command<Message> = (commandText, chatId) => {
  const botUsername = process.env.BOT_USERNAME;

  switch (commandText) {
    case '/start':
    case `/start@${botUsername}`:
      return start(chatId);
    case '/verse':
    case `/verse@${botUsername}`:
      return verse(chatId);
    default:
      return base(chatId);
  }
};

export { command };
