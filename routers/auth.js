/*********************************************************************** RUTAS DE USUARIO / AUTH ***********************************************************************/
/*************************************************************************** HOST + /API/AUTH ***************************************************************************/
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );
const { validateFields } = require( '../middlewares/validateFields' );
const { verifyJWT } = require( '../middlewares/verifyJWT' );
const { login } = require( '../controllers/auth/login' );
const { register } = require( '../controllers/auth/register' );
const { renewJWT } = require( '../controllers/auth/renew' );

const router = Router();

router.post(
    '/',
    [
        check( 'email', 'El email no es válido.' ).isEmail().normalizeEmail(),
        check( 'password', 'La contraseña debe tener al menos 6 caracteres y no debe tener caracteres especiales.' ).isLength( { min: 6 } ).isAlphanumeric(),
        validateFields
    ],
    login
);

router.post(
    '/register',
    [ 
        check( 'name', 'Ingrese un nombre válido.' ).trim().escape().not().isEmpty().isLength( { min: 2 } ).isString(),
        check( 'email', 'El email no es válido.' ).isEmail().normalizeEmail(),
        check( 'password', 'La contraseña debe tener al menos 6 caracteres y no debe tener caracteres especiales..' ).isLength( { min: 6 } ).isAlphanumeric(),
        validateFields
    ],
    register
);

router.get( '/renew', verifyJWT, renewJWT );

module.exports = router;
