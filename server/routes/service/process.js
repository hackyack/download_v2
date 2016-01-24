var Task = require(__base + 'models/task');

exports.perform = function(task) {

	return new Promise(function(resolve, reject) {

		if (task.status = "finished") {
			reject();
		}
		else {
			var currentTask = task.processes[task.currentProcess);

			var process = undefined;

			switch(currentprocess) {
			    case "torrent_download":
			        process = downloadTorrent(task);
			        break;
			    case "torrent_debrid":
			        process = debridTorrent(task);
			        break;
			    case "magnet_debrid":
			    	process = debridMagnet(task);
			    	break;
			    case "file_download":
			    	process = downloadFile(task);
			    	break;
			    case "file_rename":
			    	process = renameFile(task);
			    	break;
			}

			if (process) {
				process.then(function(result) {
					task.currentTask++;
					task.save(function (err) {
						if (err) {
							reject();
						}
						else {
							resolve()
						}
					})
				}).catch(function(err) {
					reject();
				})
			}
			else {
				reject();
			}
		}
		
	});
	

function downloadTorrent(task) {

}

function debridTorrent(task) {

} 

function debridMagnet(task) {

} 

function downloadFile(task) {

} 

function RenameFile(task) {

} 