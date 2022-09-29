// Import Solana web3 functinalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");
Base58 = require("base-58")

const publicKey = process.argv.slice(2)[0];
console.log("Receaved Public Key:", publicKey);

const airDropSol = async () => {
    try {
        // Connect to the Devnet and make a wallet from privateKey
        const connection = new Connection(clusterApiUrl("devnet"),
"confirmed");

        // Request airdrop of 2 SOL to the wallet
        console.log("Airdropping some SOL to my wallet!");
        const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(Base58.decode(publicKey)),
            0.01 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const mainFunction = async () => {
    await airDropSol();
}

 mainFunction();
 // node airDropByPublicKey.js B4qaviNTFV7Aw5K6M8MRrCCJMLMb9UsvFFZuSrPzXzq5
