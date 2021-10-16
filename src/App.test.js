import rewire from "rewire"
import React from "react"
import { render, waitFor } from "@testing-library/react"
import { setupServer } from "msw/node"
import { handlers, rest, issuesURL } from "./mocks/handlers"
const App = rewire("./App")
const fetchIssues = App.__get__("fetchIssues")
const server = setupServer(...handlers)

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test('Renders open issues', async () => {
	const { getByText } = render(<App />);

	expect(getByText(/Loading.../i)).toBeInTheDocument();

	await waitFor(() => {
		expect(getByText(/19823/i)).toBeInTheDocument();
		expect(getByText(/19773/i)).toBeInTheDocument();
	});
});

test('Fails fetching open issues', async () => {
	server.use(
		rest.get(issuesURL, (req, res, ctx) => {
			return res(ctx.status(400));
		})
	);

	const { getByText } = render(<App />);
	await waitFor(() => {
		expect(getByText(/Something went wrong./i)).toBeInTheDocument();
	});
});

test('Zero opened issues', async () => {
	server.use(
		rest.get(issuesURL, (req, res, ctx) => {
			return res(ctx.status(200), ctx.json({}));
		})
	);

	const { getByText } = render(<App />);

	await waitFor(() => {
		expect(getByText(/There are no open issues./i)).toBeInTheDocument();
	});
});

// @ponicode
describe("fetchIssues", () => {
    test("0", async () => {
        await fetchIssues()
    })
})
