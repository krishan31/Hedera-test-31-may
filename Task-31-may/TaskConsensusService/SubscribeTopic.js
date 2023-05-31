const {
  TopicCreateTransaction,
  Client,
  Wallet,
  TopicMessageQuery,
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

async function subscribeTopic(topicId) {
  new TopicMessageQuery()
    .setTopicId(topicId)
    .setStartTime(0)
    .subscribe(client, (message) =>
      console.log(Buffer.from(message.contents, 'utf8').toString())
    );
}

subscribeTopic('0.0.10570828');
