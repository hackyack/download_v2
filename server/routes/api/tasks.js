var fs = require('fs');
var Task = require(__base + 'models/task');

exports.torrent = function (req, res) {
    
    var task = createTask(req.body, req.user.id);

    task.processes = ["torrent_debrid", "file_download"];

    // Torrent
    var torrent = req.files.torrent;
    var destPath = __base + "/files/" + torrent.name;
    task.input.torrent_filename = torrent.name;

    copyFile(torrent.path, destPath).then(function() {
    	return task.save();
    }).then(function() {
    	res.status(200).json({
            success: true
        });
    }).catch(function(err) {
    	res.status(200).json({
            success: false,
            message: err
        }); 
    });
};

exports.magnet = function (req, res) {

	var task = createTask(req.body, req.user.id);

    task.processes = ["magnet_debrid", "file_download"];

    task.magnet_link = req.body.magnet_link;

    task.save().then(function() {
    	res.status(200).json({
            success: true
        });
    }).catch(function(err) {
    	res.status(200).json({
            success: false,
            message: err
        }); 
    });
};

exports.link = function (req, res) {

	var task = createTask(req.body, req.user.id);

    task.processes = ["file_download"];

    task.link = req.body.link;

    task.save().then(function() {
    	res.status(200).json({
            success: true
        });
    }).catch(function(err) {
    	res.status(200).json({
            success: false,
            message: err
        }); 
    });
};

exports.t411 = function (req, res) {

	var task = createTask(req.body, req.user.id);

    task.processes = ["t411_download", "torrent_debrid", "file_download"];

    task.t411_id = req.body.t411_id;

    task.save().then(function() {
    	res.status(200).json({
            success: true
        });
    }).catch(function(err) {
    	res.status(200).json({
            success: false,
            message: err
        }); 
    });
};

function copyFile(source, target) {
    return new Promise(function(resolve, reject) {
        var rd = fs.createReadStream(source);
        rd.on('error', reject);
        var wr = fs.createWriteStream(target);
        wr.on('error', reject);
        wr.on('finish', resolve);
        rd.pipe(wr);
    });
};

function createTask(infos, user) {
	var task = new Task();

	// General
	task.status = "pending";
	task.currentTask = 0;

	// User
    task.user = user;

    // Info
    if (infos.type == "movie") {
    	task.info.movie.title = infos.title;
    	task.info.movie.year = infos.year;
    	task.processes.push("file_rename");
    }
    else if (infos.type == "tv") {
    	task.info.tv.title = infos.title;
    	task.info.tv.season = infos.season;
    	task.info.tv.episode = infos.episode;
    	task.info.tv.name = infos.name;
    	task.info.tv.year = infos.year;
    	task.processes.push("file_rename");
    }

    return task;
}