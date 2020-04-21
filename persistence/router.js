const { getRouter } = require('stremio-addon-sdk');
const disassemble = require('./controllers/movie-assembler');
const metaDao = require('./controllers/meta-dao');
const streamDao = require('./controllers/stream-dao');

module.exports = function getProxyRouter(addonInterface) {
    const router = getRouter(addonInterface);

    router.post('/movie', (req, res) => {
        const movie = disassemble(req.body);

        metaDao.upsert(movie.meta);
        movie.streams.map(m => { streamDao.upsert(m) });
    });
}