
// class load view

class View {
	constructor({view,props}) {
		this.view = view;
		 let $props = props || null;

		 let $pathPHP = '/views/';
		 let $pathJS = '/js/';

		this.load(this.view, $pathPHP, $props, $pathJS);

	}

	load($view, $pathPHP, $data, $script){
		console.log(`${$pathPHP}${$view}.php`);
		fetch(`${$pathPHP}${$view}.php`)
		.then(res => res.text())
		.then(content => {
			this.template(content, $data);
		});
		sessionStorage.setItem('viewContent', $view);
	}

	template($content, $data = null){

		let $template = '';
		const $view = document.querySelector('content');

		let $script = this.getScript($content);

		if($data !== null) {
			let $properties = [];
			for(let param in $data) {
				$properties.push(param);
			}
			$properties.forEach($param => {
				let $replace = new RegExp('\\{\\{'+$param+'\\}\\}', "g")
				$template = $content.replace($replace,`${$data[$param]}`);
				$content = $template;
			});
		}else {
			$template = $content;
		}

		$view.innerHTML = $template;

		this.setScript($script);

	}

	getScript($string){
		let $result = $string.split('<script src="');
		let $r = '';
		if($result.length > 0){
			$result = $result[1];
			$r = $result.replace("\"\>\<\/script\>", '');
		}
		return $r;
	}

	setScript(nombre) {
			let s = document.createElement("script");
			s.src = nombre;
			document.querySelector("body").appendChild(s);
	}
}

// end class load views
