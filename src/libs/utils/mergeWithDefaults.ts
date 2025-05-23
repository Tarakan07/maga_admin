// export const mergeWithDefaults = (defaults: any, data: any) => {
// 	if (typeof defaults !== "object" || defaults === null) {
// 		return data === undefined ? defaults : data;
// 	}

// 	return Object.keys(defaults).reduce(
// 		(acc: any, key: any) => {
// 			acc[key] = mergeWithDefaults(defaults[key], data?.[key]);
// 			return acc;
// 		},
// 		Array.isArray(defaults) ? [] : {}
// 	);
// };

// function mergeDataWithDefaults<T>(serverData: T, defaultData: T): T {
//   const mergedData = {} as T;

//   for (const key in defaultData) {
//     if (defaultData.hasOwnProperty(key)) {
//       const serverValue = serverData?.[key];
//       const defaultValue = defaultData[key];

//       if (typeof serverValue === "object" && serverValue !== null && !Array.isArray(serverValue)) {
//         mergedData[key] = mergeDataWithDefaults(serverValue, defaultValue);
//       } else {
//         mergedData[key] = serverValue !== undefined ? serverValue : defaultValue;
//       }
//     }
//   }

//   return mergedData;
// }

export function mergeDataWithDefaults<T extends Record<string, any>>(
	serverData: T,
	defaultData: T
): T {
	const mergedData = {} as T

	for (const key in defaultData) {
		if (Object.prototype.hasOwnProperty.call(defaultData, key)) {
			const serverValue = serverData?.[key]
			const defaultValue = defaultData[key]

			if (
				typeof serverValue === 'object' &&
				serverValue !== null &&
				!Array.isArray(serverValue)
			) {
				mergedData[key] = mergeDataWithDefaults(serverValue, defaultValue)
			} else {
				mergedData[key] = serverValue !== undefined ? serverValue : defaultValue
			}
		}
	}

	return mergedData
}
