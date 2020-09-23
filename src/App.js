import React, { useState } from 'react';
import Spaceship from './components/Spaceship';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { DOMAIN } from './constants';

function App({configuration}) {
	const {contentKey, siteKey} = configuration.portletInstance;

	const [spaceship, setSpaceship] = useState();

	const processContent = (data) => {
		const structuredContentByKey = data.structuredContentByKey;

		const spaceship = {
			name: structuredContentByKey.title,
			parts: []
		};

		structuredContentByKey.contentFields.forEach(field => {
			spaceship[field.name.toLowerCase()] = field.contentFieldValue.data || 
				(field.contentFieldValue.image && 
					`${DOMAIN}${field.contentFieldValue.image.contentUrl}`
				)
			
			if (field.nestedContentFields.length > 0) {
				const spaceshipPart = {
					name: field.contentFieldValue.structuredContentLink.graphQLNode.title
				};

				field.nestedContentFields.forEach(nestedField => {
					spaceshipPart[nestedField.name.toLowerCase()] = nestedField.contentFieldValue.data;
				})

				field.contentFieldValue.structuredContentLink.graphQLNode.contentFields.forEach(linkedContentField => {
					spaceshipPart[linkedContentField.name.toLowerCase()] = linkedContentField.contentFieldValue.data;
				})

				spaceship.parts.push(spaceshipPart);
			}
		});

		setSpaceship(spaceship);
	};

	useQuery(
		gql`
			query getSpaceship($siteKey: String!, $contentKey: String!) {
				structuredContentByKey(key: $contentKey, siteKey: $siteKey) {
					contentFields {
						contentFieldValue {
							data
							image {
								contentUrl
							}
							structuredContentLink {
								graphQLNode {
									id
									... on StructuredContent {
										contentFields {
											contentFieldValue {
												data
											}
											label
											name
										}
										title
									}
								}
								title
							}
						}
						label
						name
						nestedContentFields {
							contentFieldValue {
								data
							}
							label
							name
						}
					}
					title
				}
			}
		`,
		{
			onCompleted: processContent,
			variables: { 
				contentKey,
				siteKey,
			},
		}
	);

	return (
		<React.Fragment>
			{spaceship && (
				<Spaceship
					pointsColor={configuration.system.pointsColor}
					spaceshipName={spaceship.name}
					spaceshipDescription={spaceship.description}
					spaceshipPicture={spaceship.image}
					spaceshipParts={spaceship.parts}
				/>
			)}
		</React.Fragment>
	);
}

export default App;
