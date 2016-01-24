var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var taskSchema = Schema({
	user: { 
		type: Schema.Types.ObjectId, 
		ref: 'User' 
	},
	input: {
		link_url: String,
		torrent_filename: String,
		t411_id: String,
		magnet_link: String,
	},
	info: {
		tv: {
			name: String, 
			season: Number, 
			episode: Number, 
			title: String,
			year: Number
		},
		movie: {
			title: String, 
			year: Number
		}
	},
	status: String,		// PENDING, RUNNING, FINISHED
	currentProcess: Number,
	processes: [String]		// [t411_download, torrent_debrid, manet_debrid, file_download, file_rename]
});


taskSchema.methods.getType = function () {
	if (this.tv && this.tv.title) {
		return 'tv'
	}
	else if (this.movie && this.movie.title) {
		return 'movie'
	}
	else {
		return 'other'
	}
}

taskSchema.methods.getInputType = function () {
	if (this.input && this.input.link_url) {
		return 'link'
	}
	else if (this.input && this.input.torrent_filename) {
		return 'torrent'
	}
	else if (this.input && this.input.t411_id) {
		return 't411'
	}
	else if (this.input && this.input.magnet_link) {
		return 'magnet'
	}
	else {
		return undefined;
	}
}

module.exports = mongoose.model('Task', taskSchema);

/*

() = To show progress
"" optional


** Tasks **

Download torrent from T411 :
{
	input: torrent_id
	ouput: torrent_filename
}

Add torrent on real-debrid :
{
	input: torrent_filename
	output: link, (torrent_id)
}

Add magnet on real-debrid :
{
	input: magnet_link
	output: link, (torrent_id)
}

Download file on NAS:
{
	input: link
	output: filename, (task_id)
}

Rename file, Create path, Move file 
{
	input: filename, title, type=movie/tv, "season", "episode"
	output: 
}


** Entry **

Set T411 Torrent ID
{
	params: Torrent_id
	to_save: torrent_id
}

Upload Torrent File on server
{
	params: torrent file
	to_save: torrent_filename
}

Set magnet link
{
	params: magnet_link,
	to_save: magnet_link
}

Set link 
{
	params: link
	to_save: link
}

 */
