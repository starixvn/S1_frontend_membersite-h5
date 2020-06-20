import config from "../config";

export default langId => {
	return {
		terms: `${config.t_and_cURL}/SiteSkin/Nova88/Static/${langId}/TermsConditions.html`,
		rule: `${config.t_and_cURL}/SiteSkin/Nova88/Static/${langId}/RulesandRegulations.html`
	};
};
