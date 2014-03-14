chrome.webRequest.onHeadersReceived.addListener(function(details) {
	if (details.responseHeaders) {
		var newHeaders = [{
			name: 'X-XSS-Protection',
			value: '0'
		}];
		details.responseHeaders.forEach(function(header) {
			if (!/^(?:(?:X-)?Content-Security-Policy|X-WebKit-CSP)/i.test(header.name) && !/^X-XSS-Protection$/i.test(header.name)) {
				newHeaders.push(header);
			}
		});
		return {responseHeaders: newHeaders};
	}
}, {
	urls: ['*://*/*'],
	types: ['main_frame', 'sub_frame']
}, ['blocking', 'responseHeaders']);