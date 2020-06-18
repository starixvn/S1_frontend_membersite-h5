import useInterval from "../components/hook/useInterval";

export default (
	Func_GetData,
	filterData,
	pageInfo,
	State_SetData,
	State_SetPageInfo,
	State_SetPopBox
) => {
	useInterval(
		() => {
			let pageNumber = pageInfo.pageNumber + 1;
			Func_GetData({
				...filterData,
				PageNumber: pageNumber
			}).then(res => {
				if (res.data.errorCode === 0) {
					State_SetData(prevState => {
						return pageNumber === 1
							? res.data.data
							: [...prevState, ...res.data.data];
					});
					if (res.data.totalPages >= res.data.pageNumber) {
						State_SetPageInfo(() => ({
							totalPages: res.data.totalPages,
							pageNumber: res.data.pageNumber
						}));
					}
				} else {
					State_SetPopBox({
						isOpen: true,
						content: res.data.message
					});
				}
			});
		},
		pageInfo.pageNumber === pageInfo.totalPages ? null : 2000
	);
};
