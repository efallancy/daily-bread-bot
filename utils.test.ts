describe('utils', () => {
  beforeAll(() => {
    process.env.BOT_TOKEN = 'abc123';
  });

  describe('getCurrentEpochTime', () => {
    it('should return number value', async () => {
      const { getCurrentEpochTime } = await import('./utils');
      const result = getCurrentEpochTime();
      expect(typeof result).toEqual('number');
    });
  });

  describe('baseTelegramUrl', () => {
    it('should return telegram bot base url', async () => {
      const { baseTelegramUrl } = await import('./utils');
      const expected = 'https://api.telegram.org/botabc123';

      expect(baseTelegramUrl).toEqual(expected);
    });
  });
});
