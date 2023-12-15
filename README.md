# thetatx

Javascript Class for creating raw transactions on the Theta blockchain

This class will format your raw transaction and ethers-v4 is used in the examples to sign them.  They then can be broadcast over the Theta Network at https://www.thetascan.io/broadcast_txn/ or using any Guardian Node.  In the examples the signed transaction that is ready to be broadcasted is logged to the console.

You can create offline transactions and send them at any time you like. For example if you need to mass create 100 transations.  You can create and sign them then broadcast them as need.  An example of this would be updating Edge node reward distributions. All the transactions could be created and signed then when you are ready to increase or lower you fees they could be broadcasted and the nodes fees would increase or decrease. 

Currently the class supports transaction types:

* Type 2 - Send Tfuel or Theta
* Type 7 - Interact with a smart contract
* Type 9 - Withdraw from a Node
* Type 10 - Deposit to a Guardian or Edge Node
* Type 11 - Stake Reward Distribution

<h2> Creating a Raw Type 2 Transaction Example - Send </h2>

```

<script src="https://www.thetascan.io/dist/ethers-v4.min.js"
        charset="utf-8"
        type="text/javascript">
</script>
<script src="https://www.thetascan.io/dist/thetatx-v1.js"
        charset="utf-8"
        type="text/javascript">
</script>

<script>
var array = {};
array["txType"] = 2;
array["sequence"] = 1;
array["from"] = "0x8675f93310b3b968c0bc2d416549c32314f12173";
array["to"] = "0x0b3d7bb22d572f24a146fa9023b2bb50ef51931b";
array["theta"] = 1;
array["tfuel"] = 0;


var thetaTx = new thetatx(array);
const transaction = thetaTx.buildtx();
const privateKey = "0x12345678901234567890123456789012345678901234567890";
let wallet = new ethers.Wallet(privateKey);
let signPromise = wallet.sign(transaction)
signPromise.then((signedTransaction) => {
    console.log (thetaTx.rawtx(signedTransaction));
});
</script>

```

<h2> Creating a Raw Type 7 Transaction Example - Interact with a smart contract </h2>

```

<script src="https://www.thetascan.io/dist/ethers-v4.min.js"
        charset="utf-8"
        type="text/javascript">
</script>
<script src="https://www.thetascan.io/dist/thetatx-v1.js"
        charset="utf-8"
        type="text/javascript">
</script>

<script>
var array = {};
array["txType"] = 7;
array["sequence"] = 3;
array["from"] = "0x8675f93310b3b968c0bc2d416549c32314f12173";
array["to"] = "0x0b3d7bb22d572f24a146fa9023b2bb50ef51931b";
array["gasPrice"] = 0.000004;
array["gasLimit"] = 50000;
array["tfuel"] = 0;
array["data"] = ethers.utils.id("name()").slice(0,10);



var thetaTx = new thetatx(array);
const transaction = thetaTx.buildtx();
const privateKey = "0x12345678901234567890123456789012345678901234567890";
let wallet = new ethers.Wallet(privateKey);
let signPromise = wallet.sign(transaction)
signPromise.then((signedTransaction) => {
    console.log (thetaTx.rawtx(signedTransaction));
});

</script>

```

If you want more information on how to encode the data to interact with a smart contact visit https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding 
An example use case would be minting a NFT you could create a function named mint in the smart contact use `array["data"] = ethers.utils.id("mint()").slice(0,10);` and set the value to the price of the NFT in tfuel.  Once the transaction is broadcast the NFT would be minted.

<h2> Creating a Raw Type 9 Transaction Example - Withdraw Stake </h2>

```

<script src="https://www.thetascan.io/dist/ethers-v4.min.js"
        charset="utf-8"
        type="text/javascript">
</script>
<script src="https://www.thetascan.io/dist/thetatx-v1.js"
        charset="utf-8"
        type="text/javascript">
</script>

<script>
var array = {};
array["txType"] = 9;
array["sequence"] = 99999;
array["from"] = "0x8675f93310b3b968c0bc2d416549c32314f12173";
array["node"] = "0x0b3d7bb22d572f24a146fa9023b2bb50ef51931b"; 
array["type"] = "edge";  // You can change the type to "guardian" for Theta.

var thetaTx = new thetatx(array);
const transaction = thetaTx.buildtx();
const privateKey = "0x12345678901234567890123456789012345678901234567890";
let wallet = new ethers.Wallet(privateKey);
let signPromise = wallet.sign(transaction)
signPromise.then((signedTransaction) => {
    console.log (thetaTx.rawtx(signedTransaction));
});


</script>

```


<h2> Creating a Raw 10 Transactions Example - Deposit Stake </h2>

```

<script src="https://www.thetascan.io/dist/ethers-v4.min.js"
        charset="utf-8"
        type="text/javascript">
</script>
<script src="https://www.thetascan.io/dist/thetatx-v1.js"
        charset="utf-8"
        type="text/javascript">
</script>

<script>
var array = {};
array["txType"] = 10;
array["sequence"] = 1;
array["from"] = "0x8675f93310b3b968c0bc2d416549c32314f12173";
array["node"] = "0x5b05C502e698ae85d1430c6eE650AeBddab6911794192ca4dfa8fb927a1952dae8ba1d89491d0e418f280a83e3679f876ea509d74e1d65d83684d17f7d4c300d94f139d1a84bcf9f9d001ebcbf05bd4335a0c37897e5b41391523405e73bd4eae88b33ee3a51efd86879b04344ddacce9889941c017a75823064bb1ad16208d58835d24e0666b497b02ebe983963320836747eda805e3dd5647e139c42b1a8d0b6050b9bb171d6f9d9913b63060c81fc20184395fef0782600cf3b1c3eb8924d2cc6a2b61c8484aef0e389c756f25a4146bcd68c4286e5bbdb7a66ac701360c2c5c83e5100e1495982bfc819bafca7076c9eb28b30bbc557c3e1b3454717bf6412757855a3";  // Enter the node Summary
array["type"] = "edge";  // You can change the type to "guardian" for Theta staking
array["stake"] = 100;

var thetaTx = new thetatx(array);
const transaction = thetaTx.buildtx();
const privateKey = "0x12345678901234567890123456789012345678901234567890";
let wallet = new ethers.Wallet(privateKey);
let signPromise = wallet.sign(transaction)
signPromise.then((signedTransaction) => {
    console.log (thetaTx.rawtx(signedTransaction));
});

</script>

```

<h2> Creating a Raw Type 11 Transaction Example - Stake Reward Distribution </h2>

<h3>Example 1</h3>

```

<script src="https://www.thetascan.io/dist/ethers-v4.min.js"
        charset="utf-8"
        type="text/javascript">
</script>
<script src="https://www.thetascan.io/dist/thetatx-v1.js"
        charset="utf-8"
        type="text/javascript">
</script>

<script>
var array = {};
array["txType"] = 11;
array["sequence"] = 1;
array["node"] = "0x8675f93310b3b968c0bc2d416549c32314f12173";
array["beneficiary"] = "0x0b3d7bb22d572f24a146fa9023b2bb50ef51931b";
array["split"] = 300;

var thetaTx = new thetatx(array);
const transaction = thetaTx.buildtx();
const privateKey = "0x12345678901234567890123456789012345678901234567890";
let wallet = new ethers.Wallet(privateKey);
let signPromise = wallet.sign(transaction)
signPromise.then((signedTransaction) => {
    console.log (thetaTx.rawtx(signedTransaction));
});
</script>

```

If you need more information on how to use ethers.js to create a wallet or open a json keystore file you can find it at https://docs.ethers.org/v4/api-wallet.html

<h2> Creating a Raw Type 2 Transaction Example - Send with ethers-v5.5.4 </h2>

```

<script src="https://www.thetascan.io/dist/ethers-5.5.4.umd.min.js"
        charset="utf-8"
        type="text/javascript">
</script>
<script src="https://www.thetascan.io/dist/thetatx-v1.js"
        charset="utf-8"
        type="text/javascript">
</script>

<script>
var array = {};
array["txType"] = 2;
array["sequence"] = 1;
array["from"] = "0x8675f93310b3b968c0bc2d416549c32314f12173";
array["to"] = "0x0b3d7bb22d572f24a146fa9023b2bb50ef51931b";
array["theta"] = 1;
array["tfuel"] = 0;


var thetaTx = new thetatx(array);
const transaction = thetaTx.buildtx();
const privateKey = "0x12345678901234567890123456789012345678901234567890";
let wallet = new ethers.Wallet(privateKey);
let signPromise = wallet.signTransaction(transaction);
signPromise.then((signedTransaction) => {
    console.log (thetaTx.rawtx(signedTransaction));
});
</script>

```
