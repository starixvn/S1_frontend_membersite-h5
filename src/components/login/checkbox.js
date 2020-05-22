import React from 'react';

const Checkbox = props => {
	return (
		<div className={props.className} onChange={props.checkboxHandler}>
			<input type="checkbox" id={props.id} />
			<label htmlFor={props.id}>
				<div></div>
			</label>
			{props.children}
		</div>
	);
};

export default Checkbox;
