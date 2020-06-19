import config from "../config";

export default langId => {
	return {
		terms: `${config.apiURL}/SiteSkin/Nova88/Static/${langId}/TermsConditions.html`,
		rule: `${config.apiURL}/SiteSkin/Nova88/Static/${langId}/RulesandRegulations.html`
	};
};
