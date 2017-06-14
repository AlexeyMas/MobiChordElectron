var fs = require('fs')

const holder = document.getElementById('holder')
holder.ondragover = () => {
	return false;
}
holder.ondragleave = holder.ondragend = () => {
	return false;
}
holder.ondrop = (e) => {
	e.preventDefault()
	for (let f of e.dataTransfer.files) {
		console.log('File(s) you dragged here: ', f.path)
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

			fs.writeFile(f.path+'san', data, 'utf8', function(err) {
				if (err) {
					return console.log(err);
				};
			});
		});
		//var content = fs.readFileSync(f.path)
		//alert(content)
	}
	return false;
}