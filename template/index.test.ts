describe('template', () => {
  it('should return formated verse message', async () => {
    const expectedFormat = `
From sample testament

_sample verse_

~ Book 42:8 ~
`;

    const verse = {
      verse: 'sample verse',
      chapter: '42',
      number: '8',
      book: 'Book',
      testament: 'sample testament',
      uuid: '123',
      bookid: '2',
    };

    const { verseMdTemplate } = await import('./index');
    expect(verseMdTemplate(verse)).toEqual(expectedFormat);
  });
});
