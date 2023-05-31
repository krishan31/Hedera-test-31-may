const {
  TopicCreateTransaction,
  Client,
  Wallet,
  TopicMessageQuery,
  TopicMessageSubmitTransaction,
  TopicInfoQuery,
  PrivateKey,
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
const walletUser2 = new Wallet(myAccountId2, myPrivateKey2);

async function submitMessage(topicId) {
  let sendResponse = await new TopicMessageSubmitTransaction({
    topicId: topicId,
    message: new Date().toISOString(),
  }).execute(client);

  const getReceipt = await sendResponse.getReceipt(client);
  const transactionStatus = getReceipt.status;
  console.log('The message transaction status: ' + transactionStatus);

  process.exit();
}

submitMessage('0.0.10570828');
