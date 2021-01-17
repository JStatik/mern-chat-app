const colors = require( 'colors' );
const User = require( '../../models/user' );

class UserControl {
    updateOnlineUser = async( uid, online ) => {
        try {
            const user = await User.findByIdAndUpdate(
                uid,
                { online: online },
                {
                    new: true,
                    runValidators: true,
                    context: 'query'
                }
            );
    
            return {
                user
            };
        } catch( err ) {
            console.log( colors.magenta( err ) );
            return;
        }
    };

    getUsers = async() => {
        try {
            const users = await User.find().sort( '-online' );

            return {
                users
            };
        } catch( err ) {
            console.log( colors.magenta( err ) );
            return;
        }
    }

    getActiveChatUser = async( uid ) => {
        try {
            const user = await User.findById( uid );

            return {
                activeChat: user.activeChat
            };
        } catch( err ) {
            console.log( colors.magenta( err ) );
            return;
        }
    }

    updateActiveChatUser = async( uid, activeChat ) => {
        try {
            await User.findByIdAndUpdate(
                uid,
                { activeChat: activeChat },
                {
                    new: true,
                    runValidators: true,
                    context: 'query'
                }
            );
        } catch( err ) {
            console.log( colors.magenta( err ) ); 
            return;
        }
    };
};

module.exports = {
    UserControl
};
