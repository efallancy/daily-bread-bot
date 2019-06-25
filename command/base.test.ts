describe('command', () => {
  describe('base', () => {
    it('should call sendMessage method', async () => {
      const utils = await import('../utils');
      utils.sendMessage = jest.fn();

      const { baseMdTemplate } = await import('../template');
      const { base } = await import('./base');

      const mockChatId = 123;
      const expected = {
        chat_id: mockChatId,
        text: baseMdTemplate,
        parse_mode: utils.EnumParseMode.markdown,
      };

      await base(mockChatId);
      expect(utils.sendMessage).toHaveBeenCalledWith(expected);
    });
  });
});
