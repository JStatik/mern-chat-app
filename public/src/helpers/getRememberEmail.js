const getRememberEmail = () => {
    const user = JSON.parse( localStorage.getItem( 'ucha' ) );

    if( user?.email ) return user.email;

    return '';
};

export default getRememberEmail;
