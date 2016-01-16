exports.getEpisodeId = function(number) {
    number = parseInt(number);
    if (0 < number && number < 9) {
        return number + 936;
    }
    else if (8 < number && number < 31) {
        return number + 937;
    }
    else if (30 < number && number < 61) {
        return number + 1057;
    }
    else {
        return undefined;
    }
};

exports.getSeasonId = function(number) {
    number = parseInt(number);
    if (number == 0) {
        return 1068;
    }
    if (0 < number && number < 31) {
        return number + 967;
    }
    else {
        return undefined;
    }
};

exports.constants = {
	type: {
		tvshow: 433,
		movie: 631,
	},
	term: {
		episode: "term[46][]",
		season: "term[45][]"
	}
};