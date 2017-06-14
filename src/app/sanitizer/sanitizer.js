var fs = require('fs');

const holder = document.getElementById('holder');
const attachedFiles = document.getElementById('files');

function addAttachedFileEl(file) {
	var divEl = document.createElement('div');
	if (file) {
		var linkEl = document.createElement('a');
		linkEl.href = file.path;
		linkEl.target = '_blank';
		linkEl.text = file.name;
		linkEl.style = 'color: green;';
		divEl.appendChild(linkEl);
		divEl.append(' has been sanitized and automatically downloaded.');
	} else {
		divEl.append('The file type should be XML.');
	}
	attachedFiles.appendChild(divEl);
}

function getSanitizedFileName(fileName) {
	return fileName.substr(0, fileName.length - 4) + ' (sanitized).xml';
}

holder.ondragover = () => {
	return false;
}
holder.ondragleave = holder.ondragend = () => {
	return false;
}
holder.ondrop = (e) => {
	e.preventDefault();
	for (let f of e.dataTransfer.files) {
		if (f.name.indexOf('.xml') == -1) {
			addAttachedFileEl();
			continue;
		}
		console.log('File(s) you dragged here: ', f.path);
		//var source = 'C:\\Migration\\MobiChord Telecom Service Platform.xml';
		//var target = "c:\\MIGRATION\\res1.xml";
		fs.readFile(f.path, 'utf8', function(err, data) {
			if (err) {
				return console.log(err);
			}

			data = data.replace('<replace_on_upgrade>false</replace_on_upgrade>', '<replace_on_upgrade>true</replace_on_upgrade>');
			data = data.replace('&lt;sys_replace_on_upgrade&gt;false&lt;/sys_replace_on_upgrade&gt;', '&lt;sys_replace_on_upgrade&gt;true&lt;/sys_replace_on_upgrade&gt;');
			data = data.replace('<sys_replace_on_upgrade>false</sys_replace_on_upgrade>', '<sys_replace_on_upgrade>true</sys_replace_on_upgrade>');
			data = data.replace('<sys_customer_update>true</sys_customer_update>', '<sys_customer_update>false</sys_customer_update>');
			data = data.replace('&lt;sys_customer_update&gt;true&lt;/sys_customer_update&gt;', '&lt;sys_customer_update&gt;false&lt;/sys_customer_update&gt;');

			var newName = getSanitizedFileName(f.path);
			fs.writeFile(newName, data, 'utf8', function(err) {
				if (err) {
					return console.log(err);
				}
			});

			addAttachedFileEl(f);
	});
		//var content = fs.readFileSync(f.path)
		//alert(content)
	}
	return false;
}