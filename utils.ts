import axios from 'axios';
import { DynamoDB } from 'aws-sdk';

enum EnumParseMode {
  markdown = 'Markdown',
  html = 'HTML',
}

interface Verse {
  verse: string;
  chapter: string;
  number: string;
  book: string;
  testament: string;
  uuid: string;
  bookid: string;
}

interface SendMessageBody {
  chat_id: number;
  text: string;
  parse_mode?: EnumParseMode;
}

interface Message {
  message_id: number;
}

const dbClient = new DynamoDB.DocumentClient({});

type Url = string;
const baseTelegramUrl: Url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

type SendMessage<T> = (body: SendMessageBody) => Promise<T>;
const sendMessage: SendMessage<Message> = (body: SendMessageBody) =>
  axios.post(`${baseTelegramUrl}/sendMessage`, body, { headers: { 'Content-Type': 'application/json' } });

type TableName = string;
const tableName: TableName = 'DailyBreadVerseTable';

type ScanCachedVerse = (epochTime: number) => Promise<DynamoDB.ScanOutput>;
const scanCachedVerse: ScanCachedVerse = (epochTime: number) => {
  const params = {
    TableName: tableName,
    FilterExpression: 'expiredCacheEpochTime > :epochTime',
    ExpressionAttributeValues: { ':epochTime': epochTime },
  };

  return dbClient.scan(params).promise();
};

type PutCachedVerse = (verse: Verse) => Promise<DynamoDB.UpdateItemOutput>;
const putCachedVerse: PutCachedVerse = verse =>
  dbClient
    .put({
      TableName: tableName,
      Item: verse,
      ReturnValues: 'NONE',
    })
    .promise();

type GetCurrentEpochTime = () => number;
const getCurrentEpochTime: GetCurrentEpochTime = () => new Date().getTime();

export {
  baseTelegramUrl,
  getCurrentEpochTime,
  putCachedVerse,
  scanCachedVerse,
  sendMessage,
  EnumParseMode,
  Message,
  Verse,
};
