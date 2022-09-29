// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const privateKey = new Uint8Array(atob(process.argv.slice(2)[0]).split("").map(function(c) { return c.charCodeAt(0); }));
const newPair = Keypair.fromSecretKey(privateKey);
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
console.log("Public Key to receaved secretKey:", publicKey);

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
    try {
        // Connect to the Devnet
        const connection = new Connection(clusterApiUrl("devnet"),
"confirmed");
        // console.log("Connection object is:", connection);

        // Make a wallet (keypair) from privateKey and get its balance
        const myWallet = await Keypair.fromSecretKey(privateKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(newPair.publicKey)
        );
        console.log(`Wallet balance: ${parseInt(walletBalance) /
LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
    await getWalletBalance();
}

 mainFunction();
 // node getBalanceBySecretKey.js 0SzYHtlI+7Upt4ColnF4X0LhvfscSjeuVJIuVqJ9TxOVkIv+Tsicj4iLMSNXOqJd1GLnlXGwzyBsuIlBNBzRqA==
