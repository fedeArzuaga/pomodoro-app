export const showNotification = ( title, body ) => {
    if ( Notification.permission === "granted" ) {
        const options = {
            body,
            icon: "https://res.cloudinary.com/dubgtdvlk/image/upload/v1650984646/temporizador-notification_ilq9wa.png"
        }

        const notification = new Notification( title, options );
    }
}