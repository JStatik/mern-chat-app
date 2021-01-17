const fetchToken = async( endpoint, token ) => {
    const url = process.env.REACT_APP_BASE_API + endpoint;

    const res = await fetch( url, {
        method: 'GET',
        headers: {
            'x-token': token
        }
    } );

    return await res.json();
};

export default fetchToken;
