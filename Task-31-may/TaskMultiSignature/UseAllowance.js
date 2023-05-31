const {
  Client,
  AccountBalanceQuery,
  TransferTransaction,
  Hbar,
  PrivateKey,
  AccountCreateTransaction,
  AccountAllowanceApproveTransaction,
} = require('@hashgraph/sdk');
require('dotenv').config({ path: '../.env' });

const myAccountId = "0.0.13726541";
const myPrivateKey = PrivateKey.fromString("302e020100300506032b6570042204208439e388c567e755f61fd92dbcbe45b33c32ed77047fd3ff54702ad8e8a1b7dd");

const myAccountId2 = "0.0.13726553";
const myPrivateKey2 = PrivateKey.fromString("302e020100300506032b657004220420a2bc94552636f34a3f6fddcf00c4926fd7ed53f2e65e8d24e52501c05112764b");

const myAccountId3 = "0.0.13726574";
const myPrivateKey3 = PrivateKey.fromString("302e020100300506032b65700422042026adc6d03d5ae5ebcaa53259182273eb2a6ce97bf02910f023fa14c1b9ea6a6d");

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

const client2 = Client.forTestnet();
client2.setOperator(myAccountId2, myPrivateKey2);

async function UseAllowance() {
  const transaction = new TransferTransaction()
    .addApprovedHbarTransfer(myAccountId, new Hbar(-20))
    .addApprovedHbarTransfer(myAccountId3, new Hbar(20));
  console.log(
    `Doing transfer from ${myAccountId} to ${myAccountId3}`
  );
  const txId = await transaction.execute(client2);
  const receipt = await txId.getReceipt(client2);
  const transactionStatus = receipt.status;
  console.log(
    'The transaction consensus status is ' + transactionStatus
  );
  // Create the queries
  const queryMine = new AccountBalanceQuery().setAccountId(
    myAccountId
  );
  const queryOther = new AccountBalanceQuery().setAccountId(
    myAccountId3
  );
  const accountBalanceMine = await queryMine.execute(client2);
  const accountBalanceOther = await queryOther.execute(client2);
  console.log(
    `My account balance ${accountBalanceMine.hbars} HBar, other account balance ${accountBalanceOther.hbars}`
  );
}

UseAllowance();
