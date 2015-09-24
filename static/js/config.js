define({
	requireConfig: {
		paths: {
			"jquery": "lib/jquery-1.11.3.min",
			"jquery.validate": "plugin/jquery.validate",
			"jquery.dialog": "plugin/dialog-plus-min",
			"jquery.twbsPagination":"plugin/jquery.twbsPagination"
		},
		shim: {
			"jquery.validate": {
				deps: ['jquery']
			},
			"jquery.dialog": {
				deps: ['jquery']
			},
			"jquery.twbsPagination":{
				deps:['jquery']
			}
		}
	}
})