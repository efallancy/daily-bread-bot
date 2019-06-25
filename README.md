# Daily Bread

> 🍞 🍷 📖 🗓 🤖

Simple (and hopefully helpful) bot, goes by the username of _@DailyBreadBot_, that runs in [Telegram](https://telegram.org). Pretty much a bot that replies verse of the day from the bible, powered by [theysaidso.com](https://theysaidso.com/api/bible).

By all means, this is used as reference and you could create your own by extending or using this same structure.

## Get started

To get started, it assumes that you have NodeJS and [Serverless](https://serverless.com) installed in your workspace.

It is build using [TypeScript](https://www.typescriptlang.org) with [serverless-plugin-typescript](https://github.com/prisma/serverless-plugin-typescript);

Simply start by invoking the function locally using [Serverless invoke local](https://serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) command.

This service primarily comes with the webhook and updater worker, which is used for caching request to mitigate rate limiting.

## Up and running

To get it up and running in an expected manner, it requires an AWS account with relevant role to get it deployed. As such, it requires the role on creating and accessing AWS DynamoDB, AWS Lambda (with AWS Cloudwatch) and AWS SSM resources.

For setting up the AWS credentials, refer to this [brief guideline by Serverless](https://serverless.com/framework/docs/providers/aws/guide/credentials/).

Having all the appropriate roles assigned or created to your designated AWS user, it will only be a matter of just running the command below to deploy it.

```sh
# Serverless deploy command
sls deploy
```

Besides that, it also requires on setting the environment variable value through AWS SSM parameter store.
At minimal, `BOT_TOKEN` and `WEBHOOK_KEY` are needed to be set in the environment variable.
