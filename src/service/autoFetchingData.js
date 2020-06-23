import useInterval from "../components/hook/useInterval";
import { useEffect, useRef } from "react";

export default (
	Func_GetData,
	filterData,
	pageInfo,
	State_SetData,
	State_SetPageInfo,
	State_SetPopBox,
	processing,
	State_SetProcessing
) => {
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useInterval(
		() => {
			let pageNumber = pageInfo.pageNumber + 1;
			if (!processing) {
				State_SetProcessing(true);
				Func_GetData({
					...filterData,
					PageNumber: pageNumber
				}).then(
					res => {
						if (isMountedRef.current) {
							if (res.data.errorCode === 0) {
								State_SetData(prevState => {
									return pageNumber === 1
										? res.data.data
										: [...prevState, ...res.data.data];
								});
								if (
									res.data.totalPages >= res.data.pageNumber
								) {
									State_SetPageInfo(prevState => {
										return {
											totalPages: res.data.totalPages,
											pageNumber: res.data.pageNumber
										};
									});
								}
							} else {
								State_SetPopBox({
									isOpen: true,
									content: res.data.message
								});
							}

							State_SetProcessing(false);
						}
					},
					err => {
						if (isMountedRef.current) {
							State_SetProcessing(false);
						}
					}
				);
			}
		},
		pageInfo.pageNumber === pageInfo.totalPages ? null : 2000
	);
};
