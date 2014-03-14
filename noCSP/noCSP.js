chrome.webRequest.onHeadersReceived.addListener(function(details) {
	if (details.responseHeaders) {
		var newHeaders = [];
		details.responseHeaders.forEach(function(header) {
			if (!/^(?:(?:X-)?Content-Security-Policy|X-WebKit-CSP)/i.test(header.name) && !/^X-XSS-Protection$/i.test(header.name)) {
				newHeaders.push(header);
			}
		});
		newHeaders.push({
			name: 'X-XSS-Protection',
			value: '0'
		});
		return {responseHeaders: newHeaders};
	}
}, {
	urls: ['*://*/*'],
	types: ['main_frame', 'sub_frame']
}, ['blocking', 'responseHeaders']);