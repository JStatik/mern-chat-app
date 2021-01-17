const colors = require( 'colors' );
const Notification = require( '../../models/notification' );

class NotificationControl {
    getNotifications = async( uidUserTo ) => {
        try {
            const notifications = await Notification.find( { to: uidUserTo } );

            return {
                notifications
            };
        } catch( err ) {
            console.log( colors.magenta( err ) );
            return;
        }
    }

    updateNotification = async( from, to, notification ) => {
        try {
            const notificationDB = await Notification.findOne( { from: from, to: to } );

            if( !notificationDB ) {
                const newNotification = new Notification( { from, to, notification } );
                await newNotification.save();
            } else {
                const { _id } = notificationDB;

                if( notification === 0 ) {
                    await Notification.findByIdAndUpdate(
                        _id,
                        { notification: notification },
                        {
                            new: true,
                            runValidators: true,
                            context: 'query'
                        }
                    );
                } else {
                    await Notification.findByIdAndUpdate(
                        _id,
                        { notification: notificationDB.notification + notification },
                        {
                            new: true,
                            runValidators: true,
                            context: 'query'
                        }
                    );
                }
            }
        } catch( err ) {
            console.log( colors.magenta( err ) );
            return;
        }
    }
};

module.exports = {
    NotificationControl
};
