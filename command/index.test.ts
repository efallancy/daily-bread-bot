describe('command', () => {
  describe('main entry point', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      process.env.BOT_USERNAME = 'BotUserName';
    });

    it('should call `base` method for unknown command', async () => {
      const baseCommand = await import('./base');
      baseCommand.base = jest.fn();

      const { command } = await import('./index');

      const commandTxt = '/unknown';
      const chatId = 123;

      await command(commandTxt, chatId);
      expect(baseCommand.base).toHaveBeenCalledWith(chatId);
    });

    it('should call `start` method for `/start` command', async () => {
      const startCommand = await import('./start');
      startCommand.start = jest.fn();

      const { command } = await import('./index');

      const commandTxt = '/start';
      const chatId = 123;

      await command(commandTxt, chatId);
      expect(startCommand.start).toHaveBeenCalledWith(chatId);
    });

    it('should call `start` method for `/start@{botUsername}` command', async () => {
      const startCommand = await import('./start');
      startCommand.start = jest.fn();

      const { command } = await import('./index');

      const commandTxt = `/start@${process.env.BOT_USERNAME}`;
      const chatId = 123;

      await command(commandTxt, chatId);
      expect(startCommand.start).toHaveBeenCalledWith(chatId);
    });

    it('should call `verse` method for `/verse` command', async () => {
      const verseCommand = await import('./verse');
      verseCommand.verse = jest.fn();

      const { command } = await import('./index');

      const commandTxt = '/verse';
      const chatId = 123;

      await command(commandTxt, chatId);
      expect(verseCommand.verse).toHaveBeenCalledWith(chatId);
    });

    it('should call `verse` method for `/verse@{botUsername}` command', async () => {
      const verseCommand = await import('./verse');
      verseCommand.verse = jest.fn();

      const { command } = await import('./index');

      const commandTxt = `/verse@${process.env.BOT_USERNAME}`;
      const chatId = 123;

      await command(commandTxt, chatId);
      expect(verseCommand.verse).toHaveBeenCalledWith(chatId);
    });
  });
});
