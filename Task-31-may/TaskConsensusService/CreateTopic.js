const {
  TopicCreateTransaction,
  Client,
  Wallet,
  PrivateKey,
  TopicMessageQuery,
} = require('@hashgraph/sdk');
require('dotenv').config({ path: '../.env' });

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = PrivateKey.fromString(
  process.env.MY_PRIVATE_KEY
);

const myAccountId2 = process.env.ACCOUNT_ID_2;
const myPrivateKey2 = PrivateKey.fromString(
  process.env.PRIVATE_KEY_2
);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

const walletUser = new Wallet(myAccountId, myPrivateKey);

async function createTopic() {
  let transaction = new TopicCreateTransaction()
    .setSubmitKey(walletUser.publicKey)
    .setAdminKey(walletUser.publicKey)
    .setTopicMemo('Chain group');

  console.log(
    `Created a new TopicCreateTransaction with admin and submit key both set to: ${walletUser.publicKey}`
  );

  let txResponse = await transaction.execute(client);
  let receipt = await txResponse.getReceipt(client);

  let topicId = receipt.topicId;
  console.log(`Your topic ID is: ${topicId}`);

  await new Promise((resolve) => setTimeout(resolve, 5000));
}

createTopic();
