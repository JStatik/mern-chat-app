/********************************************************************* RUTAS DE MENSAJES / MESSAGES *********************************************************************/
/************************************************************************* HOST + /API/MESSAGES *************************************************************************/
const { Router } = require( 'express' );
const { verifyJWT } = require( '../middlewares/verifyJWT' );
const { getMessages } = require( '../controllers/messages/getMessages' );

const router = Router();

router.get( '/:id', verifyJWT, getMessages );

module.exports = router;
