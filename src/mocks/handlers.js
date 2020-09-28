import { rest } from 'msw';

// Must match real URL (won't be called)
const issuesURL = 'https://api.github.com/repos/facebook/react/issues';

// Mocked response
const issues = [
	{
		title: 'Bind event to react hook component.',
		number: 19823,
	},
	{
		title: 'Enable source maps for DevTools.',
		number: 19773,
	},
];

// Request handler
const handlers = [
	rest.get(issuesURL, (req, res, ctx) => {
		// response resolver function
		return res(ctx.status(200), ctx.json(issues));
	}),
];

// Export rest to add additional request handlers to this instance
export { handlers, rest, issuesURL };
