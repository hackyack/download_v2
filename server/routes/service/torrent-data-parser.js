var DataParser = {
    datas: {
        codec: {
            "x265": ["265"],
            "x264": ["264"],
        },
        language: {
            "multi": ["multi"],
            "vostfr": ["vostfr"],
            "vf": ["vf", "french"],           
        },
        quality: {
            "1080p": ["1080"],
            "720p": ["720"],
        }
    },
    order: ["language", "quality", "codec"],
    orderPerType: {
    	language: ["multi", "vostfr", "vf"],
    	quality: ["1080p", "720p"],
    	codec: ["x265", "x264"]
    },
    get: function(type, name) {
        var types = this.datas[type];
        for (var i in types) {
            for (var j in types[i]) {
                if (name.indexOf(types[i][j]) > 1) {
                    return i;
                }
            }
        }
        return "";
    }
};

function extractData(torrent) {
    return {
        id: torrent.id,
        name: torrent.name,
        size: torrent.size,
        quality: DataParser.get("quality", torrent.rewritename),
        language: DataParser.get("language", torrent.rewritename),
        codec: DataParser.get("codec", torrent.rewritename),
        seeders: torrent.seeders,
        date: torrent.added
    }
}

exports.extract = function (torrents) {
	var result = [];
	torrents.forEach(function (torrent) {
		if (torrent.name) {
			result.push(extractData(torrent));
		}
	})
	return result;
};

exports.sort = function(torrents) {
	var sortedTorrents = [];
	if (!torrents || torrents.length == 0) {
		return [];
	}

	var torrentsWithScore = [];
	torrents.forEach(function (torrent) {
		var score = 0;
		console.log(torrent);
		DataParser.order.forEach(function (type, indexType, arrayType) {
			var value = DataParser.orderPerType[type].indexOf(torrent[type]) > -1 ? DataParser.orderPerType[type].length - DataParser.orderPerType[type].indexOf(torrent[type]) : 0;
			score += Math.pow(10, arrayType.length - indexType - 1) * value;
		});
		console.log(score);
		torrentsWithScore.push({
			torrent: torrent,
			score: score
		});
	});

	console.log(torrentsWithScore);

	torrentsWithScore.sort(function (a, b) {
		return b.score - a.score;
	});

	console.log(torrentsWithScore);
	torrentsWithScore.forEach(function (torrentWithScore) {
		sortedTorrents.push(torrentWithScore.torrent);
	});

	return sortedTorrents;
}

