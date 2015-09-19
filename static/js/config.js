define({
	requireConfig: {
		paths: {
			"jquery": "lib/jquery-1.11.3.min",
			"jquery.validate": "plugin/jquery.validate",
			"jquery.dialog": "plugin/dialog-plus-min"
		},
		shim: {
			"jquery.validate": {
				deps: ['jquery']
			},
			"jquery.dialog": {
				deps: ['jquery']
			}
		}
	}
})