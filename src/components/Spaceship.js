import React, {useState} from 'react';
import classNames from 'classnames';

import Point from './Point.js';
import './Spaceship.css';

function Spaceship({
	spaceshipName,
	spaceshipDescription,
	spaceshipPicture,
	spaceshipParts,
	pointsColor
}) {
	const [activePart, setActivePart] = useState();
	const [showInfo, setShowInfo] = useState();

	return (
		<div className="spaceship-container">
			<img
				alt=""
				src={spaceshipPicture}
			/>

			<div className="spaceship-title">
				<h1>{spaceshipName}</h1>
				<p>{spaceshipDescription}</p>
			</div>

			<div className="spaceship-parts">
				<div className="spaceship-parts-points">
					{spaceshipParts.map((spaceshipPart, index) => (
						<Point
							color={pointsColor}
							key={index}
							x={spaceshipPart.x}
							y={spaceshipPart.y}
							onMouseEnter={() => {
								setActivePart(spaceshipPart);
								setShowInfo(true);
							}}
							onMouseLeave={() => {
								setShowInfo(false);
							}}
						/>
					))}
				</div>

				<div className={classNames(
					'spaceship-parts-info',
					{
						'in': activePart && showInfo,
						'out': activePart && !showInfo
					}
				)}>
					{activePart && (
						<React.Fragment>
							<h2>{activePart.name}</h2>
							<p>{activePart.description}</p>
						</React.Fragment>
					)}
				</div>

				<div className="spaceship-parts-info-help">
					{Liferay.Language.get('move-the-mouse-pointer-over-the-dots-to-discover-more')}
				</div>
			</div>
		</div>
	);
}

export default Spaceship;