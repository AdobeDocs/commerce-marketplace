import remarkValidateLinks from "remark-validate-links";
import remarkFrontmatter from "remark-frontmatter";
import remarkLintFrontmatterSchema from "remark-lint-frontmatter-schema";
import remarkLintNoDeadUrls from "remark-lint-no-dead-urls";

const remarkConfig = {
	plugins: [
		remarkValidateLinks,
		remarkFrontmatter,
		[
			remarkLintFrontmatterSchema,
			{
				schemas: {
					/* One schema for many files */
					"./.github/linters/metadata.schema.yml": [
						/* Support glob patterns ———v */
						"./src/pages/**/*.md",
					],
				},
			},
		],
		[
			remarkLintNoDeadUrls,
			{
				skipUrlPatterns: [
					"https://marketplacesupport.magento.com",
					"https://opensource.org/",
					"https://www.php.net",
					"https://business.adobe.com/products/magento/partners.html",
					"https://www.adobe.com/legal/permissions.html",
					"https://business.adobe.com",
					"https://www.adobe.com/legal/terms/enterprise-licensing/magento-legacy-terms.html"
				]
			}
		],
	],
};
export default remarkConfig;
