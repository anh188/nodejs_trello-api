const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
          
            'mongodb+srv://phwnwnh:jnKSH32HpFq6QLbe@atlascluster.hrcclc9.mongodb.net/?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('Database - Connect successfully !!!');
    } catch (error) {
        console.log('Database - Connect failure!!!');
    }
}

module.exports = {connect};