const {
  Client,
  FileCreateTransaction,
  ContractCreateTransaction,
  PrivateKey,
} = require('@hashgraph/sdk');
require('dotenv').config({ path: '../.env' });

//const myAccountId = process.env.MY_ACCOUNT_ID;
// const myPrivateKey = PrivateKey.fromString(
//   process.env.MY_PRIVATE_KEY
// );
const myAccountId = "0.0.13726541"
const myPrivateKey = PrivateKey.fromString("302e020100300506032b6570042204208439e388c567e755f61fd92dbcbe45b33c32ed77047fd3ff54702ad8e8a1b7dd");

const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

async function deployContract() {
  let storeInfoCompiled = require('./artifacts/Certification.json');
  const bytecode = storeInfoCompiled.bytecode;
  // console.log(bytecode);

  //Create a file on Hedera and store the hex-encoded bytecode
  const fileCreateTx = new FileCreateTransaction()
    //Set the bytecode of the contract
    .setContents(bytecode);

  //Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
  const submitTx = await fileCreateTx.execute(client);

  //Get the receipt of the file create transaction
  const fileReceipt = await submitTx.getReceipt(client);

  //Get the file ID from the receipt
  const bytecodeFileId = fileReceipt.fileId;

  //Log the file ID
  console.log(
    'The smart contract byte code file ID is ' + bytecodeFileId
  );

  // Instantiate the contract instance
  const contractTx = await new ContractCreateTransaction()
    //Set the file ID of the Hedera file storing the bytecode
    .setBytecodeFileId(bytecodeFileId)
    //Set the gas to instantiate the contract
    .setGas(100000);
  //Provide the constructor parameters for the contract
  // .setConstructorParameters(
  //   new ContractFunctionParameters().addString('Hello from Hedera!')
  // );

  //Submit the transaction to the Hedera test network
  const contractResponse = await contractTx.execute(client);

  //Get the receipt of the file create transaction
  const contractReceipt = await contractResponse.getReceipt(client);

  //Get the smart contract ID
  const newContractId = contractReceipt.contractId;

  //Log the smart contract ID
  console.log('The smart contract ID is ' + newContractId);

  process.exit();
}

deployContract();
