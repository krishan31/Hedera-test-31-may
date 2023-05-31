const {
  Client,
  Hbar,
  PrivateKey,
  AccountAllowanceApproveTransaction,
} = require('@hashgraph/sdk');

require('dotenv').config({ path: '../.env' });

const myAccountId = '0.0.13726541';
const myPrivateKey = PrivateKey.fromString(
  '302e020100300506032b6570042204208439e388c567e755f61fd92dbcbe45b33c32ed77047fd3ff54702ad8e8a1b7dd'
);

const myAccountId2 = '0.0.13726553';
const myPrivateKey2 = PrivateKey.fromString(
  '302e020100300506032b657004220420a2bc94552636f34a3f6fddcf00c4926fd7ed53f2e65e8d24e52501c05112764b'
);
console.log(myAccountId, myAccountId2);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

const client2 = Client.forTestnet();
client2.setOperator(myAccountId2, myPrivateKey2);

async function approveAllowance() {
  // Create the transaction
  const transaction = new AccountAllowanceApproveTransaction()
    .approveHbarAllowance(myAccountId, myAccountId2, Hbar.from(35))
    .freezeWith(client);
  //Sign the transaction with the owner account key
  const signTx = await transaction.sign(myPrivateKey);
  //Sign the transaction with the client operator private key and submit to a Hedera network
  const txResponse = await signTx.execute(client);
  //Request the receipt of the transaction
  const receipt = await txResponse.getReceipt(client);
  //Get the transaction consensus status
  const transactionStatus = receipt.status;
  console.log(
    'The transaction consensus status is ' +
      transactionStatus.toString()
  );
}

approveAllowance();
