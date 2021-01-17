const { Schema, model } = require( 'mongoose' );

const NotificationSchema = new Schema( {
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
    notification: {
        type: Number,
        required: [ true, 'La notificación es obligatoria' ],
        default: 0
    }
} );

NotificationSchema.method( 'toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
} );

module.exports = model( 'Notification', NotificationSchema );
