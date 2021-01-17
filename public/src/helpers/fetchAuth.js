const fetchAuth = async( endpoint, data ) => {
    const url = process.env.REACT_APP_BASE_API + endpoint;

    const res = await fetch( url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify( data )
    } );

    return await res.json();
};

export default fetchAuth;
