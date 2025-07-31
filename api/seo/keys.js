export const SEO_KEYS = {
	pages: (page = 1) => ["seo-pages", page],
	page: (id) => ["seo-page", id],

	robotsDomains: () => ["seo-robots-domains"],
	robotsData: (domain) => ["seo-robots-data", domain],
}
