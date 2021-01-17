const { Schema, model } = require( 'mongoose' );

const MessageSchema = new Schema( {
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [ true, 'El usuario que envia el mensaje es obligatorio' ]
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [ true, 'El usuario que recibe el mensaje es obligatorio' ]
    },
    message: {
        type: String,
        required: [ true, 'El mensaje es obligatorio' ]
    },
    imgUserFrom: {
        type: String,
        required: [ true, 'La imagen del usuario que envia el mensaje es obligatoria' ]
    }
}, {
    timestamps: true
} );

MessageSchema.method( 'toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
} );

module.exports = model( 'Message', MessageSchema );
