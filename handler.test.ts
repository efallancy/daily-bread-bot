describe('handler', () => {
  describe('updater', () => {
    let spy = undefined;

    beforeAll(() => {
      spy = jest.spyOn(console, 'error');
    });

    beforeEach(() => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      spy.mockRestore();
    });

    it('should respond on successful update', async () => {
      const utils = await import('./utils');
      utils.getCurrentEpochTime = jest.fn().mockReturnValue(123);
      utils.scanCachedVerse = jest.fn().mockReturnValue(Promise.resolve({ Count: 0 }));
      utils.putCachedVerse = jest.fn().mockReturnValue(Promise.resolve());

      const _axios = await import('axios');
      const axios = _axios.default;
      const mockAxiosResult = {
        data: {
          contents: {
            foobar: 'abc123',
          },
        },
      };
      axios.get = jest.fn().mockReturnValue(Promise.resolve(mockAxiosResult));

      const { update } = await import('./handler');

      const mockCallback = jest.fn();
      await update({}, {}, mockCallback);

      expect(mockCallback).toHaveBeenCalledWith(null, { message: 'Verse cached' });
    });

    it('should respond on valid cache', async () => {
      const utils = await import('./utils');
      utils.getCurrentEpochTime = jest.fn().mockReturnValue(123);
      utils.scanCachedVerse = jest.fn().mockReturnValue(Promise.resolve({ Count: 1 }));

      const { update } = await import('./handler');

      const mockCallback = jest.fn();
      await update({}, {}, mockCallback);

      expect(mockCallback).toHaveBeenCalledWith(null, { message: 'Cache valid' });
    });

    it('should respond with error when failing to request resource', async () => {
      const utils = await import('./utils');
      utils.getCurrentEpochTime = jest.fn().mockReturnValue(123);
      utils.scanCachedVerse = jest.fn().mockReturnValue(Promise.resolve({ Count: 0 }));
      utils.putCachedVerse = jest.fn().mockReturnValue(Promise.resolve());

      const _axios = await import('axios');
      const axios = _axios.default;
      axios.get = jest.fn().mockReturnValue(Promise.reject(new Error('Fail request')));

      const { update } = await import('./handler');

      const mockCallback = jest.fn();
      await update({}, {}, mockCallback);

      expect(spy).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should respond with error when failing to persist cache', async () => {
      const utils = await import('./utils');
      utils.getCurrentEpochTime = jest.fn().mockReturnValue(123);
      utils.scanCachedVerse = jest.fn().mockReturnValue(Promise.resolve({ Count: 0 }));
      utils.putCachedVerse = jest.fn().mockReturnValue(Promise.reject(new Error('Fail persisting')));

      const _axios = await import('axios');
      const axios = _axios.default;
      const mockAxiosResult = {
        data: {
          contents: {
            foobar: 'abc123',
          },
        },
      };
      axios.get = jest.fn().mockReturnValue(Promise.resolve(mockAxiosResult));

      const { update } = await import('./handler');

      const mockCallback = jest.fn();
      await update({}, {}, mockCallback);

      expect(spy).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('webhook', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should respond on success of processing event', async () => {
      const { webhook } = await import('./handler');

      const mockCallback = jest.fn();
      const event = {
        pathParameters: {
          key: 'dummywebhookkey',
        },
      };
      const expectedResponse = {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request made' }),
      };

      webhook(event, {}, mockCallback);

      expect(mockCallback).toHaveBeenCalledWith(null, expectedResponse);
    });

    it('should respond on unknown event', async () => {
      const { webhook } = await import('./handler');

      const mockCallback = jest.fn();
      const event = {
        pathParameters: {
          key: 'unknownkey',
        },
      };
      const expectedResponse = {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid request made' }),
      };

      webhook(event, {}, mockCallback);

      expect(mockCallback).toHaveBeenCalledWith(null, expectedResponse);
    });
  });
});
