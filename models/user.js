const { Schema, model } = require( 'mongoose' );
const uniqueValidator = require( 'mongoose-unique-validator' );

const UserSchema = new Schema( {
    name: {
        type: String,
        required: [ true, 'El nombre del usuario es obligatorio' ]
    },
    email: {
        type: String,
        required: [ true, 'El email del usuario es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ]
    },
    online: {
        type: Boolean,
        required: [ true, 'El estado del usuario es obligatorio' ],
        default: false
    },
    img: {
        type: String,
        required: [ true, 'La imagen del usuario es obligatoria' ]
    },
    activeChat: {
        type: String,
        default: ''
    }
} );

UserSchema.plugin( uniqueValidator, { message: 'El email ingresado, ya esta en uso' } );

UserSchema.method( 'toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
} );

module.exports = model( 'User', UserSchema );
