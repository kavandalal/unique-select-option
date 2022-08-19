import './App.css';
import { useState } from 'react';

function App() {
	const [numberOfSelect] = useState(3);

	const [mainState] = useState({
		a: { name: 'Value A', value: 'a' },
		b: { name: 'Value B', value: 'b' },
		c: { name: 'Value C', value: 'c' },
		d: { name: 'Value D', value: 'd' },
		e: { name: 'Value E', value: 'e' },
	});

	const [store, setStore] = useState({});
	const [taken, setTaken] = useState({});

	const handleChnage = (e) => {
		const { value, name } = e.target;

		setTaken((prev) => {
			if (name in store) {
				delete prev?.[store[name]];
			}
			if (value && !(value in prev)) {
				prev[value] = name;
			}
			return prev;
		});
		setStore((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(store);
	};
	return (
		<div className='App'>
			<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{Array(numberOfSelect)
						.fill(0)
						.map((i, index) => (
							<select
								key={`select_${index}`}
								name={`select_${index}`}
								value={store?.[`select_${index}`]}
								onChange={handleChnage}
								required>
								<option value=''>None</option>
								{Object.keys(mainState).map((j) => {
									if (!(j in taken) || taken[j] === `select_${index}`) {
										return (
											<option key={j} value={j}>
												{mainState[j].name}
											</option>
										);
									}
								})}
							</select>
						))}
				</div>

				<button type='save'>Submit</button>
			</form>
			<br />
			<br />
			<br />
			<div>Store = {JSON.stringify(store)}</div>
			<div>Already Taken = {JSON.stringify(taken)}</div>
		</div>
	);
}

export default App;
