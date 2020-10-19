import React from "react";

export const register = () => {
	// install
	self.addEventListener("install", event => {
		console.log("installing…");
	});

	// activate
	self.addEventListener("activate", event => {
		console.log("now ready to handle fetches!");
	});

	// fetch
	self.addEventListener("fetch", event => {
		console.log("now fetch!");
	});

	// return (
	// 	<script type="text/javascript">
	// 		if ("serviceWorker" in navigator)
	// 		{navigator.serviceWorker
	// 			.register("/sw.js")
	// 			.then(reg => console.log("完成 SW 設定!", reg))
	// 			.catch(err => console.log("Error!", err))}
	// 	</script>
	// );
};
