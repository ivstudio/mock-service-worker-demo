import React, { useState, useEffect } from 'react';

if (process.env.NODE_ENV === 'development') {
	const { worker } = require('./mocks/browser');
	worker.start();
}

const fetchIssues = async () => {
	const url = 'https://api.github.com/repos/facebook/react/issues';
	const resp = await fetch(url);
	if (!resp.ok) {
		throw new Error(`Req failed: ${resp.status}`);
	}
	return resp.json();
};

const App = () => {
	const [issues, setIssues] = useState([]);
	const [status, setStatus] = useState('loading');

	useEffect(() => {
		fetchIssues()
			.then((resp) => {
				setIssues(resp);
				setStatus('success');
			})
			.catch(() => {
				setStatus('error');
			});
	}, []);

	if (status === 'loading') {
		return <p>loading...</p>;
	}

	if (status === 'error') {
		return <p>Something went wrong.</p>;
	}

	return (
		<ul>
			{issues.length > 1 ? (
				issues.map((issue) => (
					<li key={issue.number}>
						#{issue.number} {issue.title}
					</li>
				))
			) : (
				<li>There are no open issues.</li>
			)}
		</ul>
	);
};

export default App;
