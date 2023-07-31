/**
 * @param {string} markdownLink
 * @returns {[string, string|undefined]}
 */
export const getLink = (markdownLink) => {
	const regex = /\[(.*)\]\((.*)\)/;
	if (regex.test(markdownLink)) {
		const match = regex.exec(markdownLink);
		if (match && match[1] && match[2]) {
			return [match[1], match[2]];
		}
	}
	return [markdownLink, undefined];
};
