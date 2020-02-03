/**
 *
 * Get issues from github
 * Trigger actions:
 * - Get data from github with the aliases
 * - Show the columns on the screen with a title
 * - Show inside the columns the cards
 *
 * If you want to add improvements, please create a fork in our GitHub:
 * https://github.com/myparcelnl
 *
 * @author      Richard Perdaan <richard@myparcel.nl>
 * @author 		Reindert Vetter <reindert@myparcel.nl>
 * @author      Robin de Laater <me@robindelaater.nl>
 * @copyright   2017 MyParcel
 * @link        https://github.com/myparcelnl/github-projects
 */

if (window.mypa == null || window.mypa == undefined) {
	window.mypa = {};
}
if (window.mypa.fn == null || window.mypa.fn == undefined) {
	window.mypa.fn = {};
}

(function() {
	window.mypa.load = function(version) {
		// get version from somewhere, wouldn't know how to get this rn
		getRelease('3.2.0');
	};

	function getRelease(version) {
		getDataAsync().then(data => {
			$.each(data, release => {
				const currentRelease = data[release];
				if (currentRelease.tag_name === version) {
					const releaseId = currentRelease.id;
					getReleaseDataAsync(releaseId);
				}
				return Error('Could not get data from git.');
			});
		});
	}

	async function getReleaseDataAsync(releaseId) {
		fetch(
			`https://api.github.com/repos/myparcelnl/magento/releases/${releaseId}`
		)
			.then(response => response.json())
			.then(data => {
				if (data.message !== 'Not Found') {
					$('.mypa_columns').append(
						`
                                <h1>${data.name} Release Notes</h1>
                                <pre markdown='1'>${data.body}</pre>
                            `
					);
				} else {
					$('.mypa_columns').append(`<p>${data.message}</p>`);
				}
			});
	}

	async function getDataAsync() {
		const url = 'https://api.github.com/repos/myparcelnl/magento/releases';
		let response = await fetch(url);
		let data = await response.json();
		return data;
	}
})();

$(document).ready(function() {
	if ($('.mypa_columns')[0]) {
		window.mypa.load();
	}
});
