require(`dotenv`).config();
const {sequelize, Account, Escrow, RefundTransaction} = require('./models');

const seed = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced successfully.');

        const buyerAccount = await Account.create({ type: 'BUYER', balance: 0 });
        const providerAccount = await Account.create({ type: 'PROVIDER', balance: 0 });
        const escrowAccount = await Account.create({ type: 'ESCROW', balance: 300 });
        
        await Escrow.create({
            buyer_account_id: buyerAccount.id,
            provider_account_id: providerAccount.id,
            escrow_account_id: escrowAccount.id,
            amount: 300,
            refunded_amount: 0,
            status: 'HELD'
        })

    }catch (error) {
        console.error('Error seeding the database:', error);
        process.exit(1);
    }
}

seed();