

var FS = require('fs');


exports.processRequest = function (context) {
	FS.readFile(context.request.physicalPath, function(error, content) {
		if(error) {
			context.reportError(400, error);
			return;
		}
		
		var mime = context.applicationInstance.mimeTypes[context.request.filePathExtension];

		if (mime) {
		    context.response.contentType = mime;
		} else if (mime !== undefined) {
		    context.reportError(403);
		    return;
		}


		context.response.binaryWrite(content);
		context.response.end();
	});
	
	return true;
};
