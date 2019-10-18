import React from 'react';

import './Point.css';

function Point({
	color,
	onMouseEnter = () => {},
	onMouseLeave = () => {},
	x,
	y
}) {
	return (
		<div
			className="point"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			style={{
				left: x,
				top: y
			}}
		>
			<svg
				style={{
					fill: color
				}}
				viewBox="0 0 120 120"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="60" cy="60" r="50"/>
			</svg>
		</div>
	)
}

export default Point;