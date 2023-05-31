const {
  Client,
  AccountBalanceQuery,
  TransferTransaction,
  Hbar,
  PrivateKey,
  AccountCreateTransaction,
  AccountAllowanceApproveTransaction,
} = require("@hashgraph/sdk");
require("dotenv").config({ path: "../.env" });

const myAccountId = "0.0.13726541";
const myPrivateKey = PrivateKey.fromString(
  "302e020100300506032b6570042204208439e388c567e755f61fd92dbcbe45b33c32ed77047fd3ff54702ad8e8a1b7dd"
);

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

async function crreateNewAccount() {
  const newAccountPrivateKey = PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;
  const newAccount = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(new Hbar(0))
    .execute(client);
  const getReceipt = await newAccount.getReceipt(client);
  const newAccountId = getReceipt.accountId;
  console.log(newAccountPrivateKey.toString());
  console.log("The new account ID is: " + newAccountId);
}

crreateNewAccount();