import { Verse } from '../utils';

const baseMdTemplate = `
Pardon me! I am not familiar with that command.

Try typing */start* to see my list of understandable command.
`;

const startMdTemplate = `
Hey there!

I am a simple bot that gives you verse of the day.

You could start by typing */verse* to get the today's verse.
`;

const verseMdTemplate = ({ verse, chapter, number, book, testament }: Verse): string => `
From ${testament}

_${verse}_

~ ${book} ${chapter}:${number} ~
`;

const verseDefaultMdTemplate = `
Please forgive me on this response.

There has been some difficulties on getting the verse.

Please try in a while ☹️
`;

export { baseMdTemplate, startMdTemplate, verseMdTemplate, verseDefaultMdTemplate };
