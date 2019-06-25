describe('command', () => {
  describe('start', () => {
    it('should call sendMessage method', async () => {
      const utils = await import('../utils');
      utils.sendMessage = jest.fn();

      const { startMdTemplate } = await import('../template');
      const { start } = await import('./start');

      const mockChatId = 123;
      const expected = {
        chat_id: mockChatId,
        text: startMdTemplate,
        parse_mode: utils.EnumParseMode.markdown,
      };

      start(mockChatId);
      expect(utils.sendMessage).toHaveBeenCalledWith(expected);
    });
  });
});
