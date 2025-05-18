import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const adoptionModel = mongoose.model('Adoption', adoptionSchema);
export default adoptionModel;