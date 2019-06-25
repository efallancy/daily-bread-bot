describe('command', () => {
  describe('verse', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should call sendMessage method', async () => {
      const utils = await import('../utils');
      utils.scanCachedVerse = jest.fn().mockReturnValue({
        Items: ['asd'],
      });
      utils.sendMessage = jest.fn();

      const template = await import('../template');
      template.verseMdTemplate = jest.fn().mockReturnValue('Foobar');

      const verse = await import('./verse');
      const mockChatId = 123;
      const expected = {
        chat_id: mockChatId,
        text: 'Foobar',
        parse_mode: utils.EnumParseMode.markdown,
      };

      await verse.verse(mockChatId);
      expect(utils.sendMessage).toHaveBeenCalledWith(expected);
    });

    it('should call sendMessage method with fallback verse message', async () => {
      const utils = await import('../utils');
      utils.scanCachedVerse = jest.fn().mockReturnValue({
        Items: [],
      });
      utils.sendMessage = jest.fn();

      const { verseDefaultMdTemplate } = await import('../template');

      const verse = await import('./verse');
      const mockChatId = 123;
      const expected = {
        chat_id: mockChatId,
        text: verseDefaultMdTemplate,
        parse_mode: utils.EnumParseMode.markdown,
      };

      await verse.verse(mockChatId);
      expect(utils.sendMessage).toHaveBeenCalledWith(expected);
    });
  });
});
