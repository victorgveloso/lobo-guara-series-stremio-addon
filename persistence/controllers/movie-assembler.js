const magnet = require('magnet-uri')

function toStreamData(movie) {
    return movie.magnets.map((m) => {

        const decode = magnet.decode(m);
        const infoHash = decode.infoHash.toLowerCase();
        const sources = decode.announce;

        return {
            metaId: movie.id,
            title: movie.title,
            type: 'movie',
            infoHash,
            sources
        }
    });
}

//Disassemble
module.exports = (movie) => {
    return {
        meta: movie.meta,
        streams: toStreamData(movie),
    }
}