// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmRawTransaction,
    sendAndConfirmTransaction
} = require("@solana/web3.js");


const senderPrivateKey = new Uint8Array(atob("0SzYHtlI+7Upt4ColnF4X0LhvfscSjeuVJIuVqJ9TxOVkIv+Tsicj4iLMSNXOqJd1GLnlXGwzyBsuIlBNBzRqA==").split("").map(function(c) { return c.charCodeAt(0); }));
const senderWallet = Keypair.fromSecretKey(senderPrivateKey);

const toWallet = Keypair.generate();

const getWalletBalance = async () => {
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"),
"confirmed");
        // console.log("Connection object is:", connection);

        // Make a wallet (keypair) from privateKey and get its balance
        WalletBalance = await connection.getBalance(
            new PublicKey(senderWallet.publicKey));
    } catch (err) {
        console.log(err);
    }

};

const transferSol = async() => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Send money from "from" wallet and into "to" wallet
    var transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: senderWallet.publicKey,
            toPubkey: toWallet.publicKey,
            lamports: parseInt(WalletBalance) / 2
        })
    );

    // Sign transaction
    var signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [senderWallet]
    );
    console.log('Signature is ', signature);
}

const mainFunction = async () => {
    WalletBalance = 0;
    await getWalletBalance();

    console.log(`Wallet balance: ${parseInt(WalletBalance) /
    LAMPORTS_PER_SOL} SOL`);

    await transferSol();

    await getWalletBalance();

    console.log(`Wallet balance: ${parseInt(WalletBalance) /
    LAMPORTS_PER_SOL} SOL`);
}

 mainFunction();
