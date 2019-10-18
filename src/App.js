import React, { useState } from 'react';
import Spaceship from './components/Spaceship';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { DOMAIN } from './constants';

function App() {
	const [spaceship, setSpaceship] = useState();

	const processContent = (data) => {
		const structuredContentByKey = data.structuredContentByKey;

		const spaceship = {
			name: structuredContentByKey.title,
			parts: []
		};

		structuredContentByKey.contentFields.forEach(field => {
			spaceship[field.label.toLowerCase()] = field.value.data || 
				(field.value.image && 
					`${DOMAIN}${field.value.image.contentUrl}`
				)
			
			if (field.nestedContentFields.length > 0) {
				const spaceshipPart = {
					name: field.value.structuredContentLink.graphQLNode.title
				};

				field.nestedContentFields.forEach(nestedField => {
					spaceshipPart[nestedField.label.toLowerCase()] = nestedField.value.data;
				})

				field.value.structuredContentLink.graphQLNode.contentFields.forEach(linkedContentField => {
					spaceshipPart[linkedContentField.label.toLowerCase()] = linkedContentField.value.data;
				})

				spaceship.parts.push(spaceshipPart);
			}
		});

		setSpaceship(spaceship);
	};

	useQuery(
		gql`
			query getSpaceship($siteId: Long!, $contentKey: String!) {
				structuredContentByKey(key: $contentKey, siteId: $siteId) {
					title
					relatedContents {
						contentType
						id
						title
					}
					contentStructureId
					contentFields {
						label
						nestedContentFields {
							label
							value {
								data
							}
						}
						value {
							structuredContentLink {
								graphQLNode {
									id
									... on StructuredContent {
										title
										contentFields {
											label
											value {
												data
											}
										}
									}
								}
							}
							data
							image {
								contentUrl
								encodingFormat
							}
						}
					}
				}
			}
		`,
		{
			onCompleted: data => { processContent(data)},
			variables: { 
				contentKey: '39236',
				siteId: 38180,
			},
		}
	);

	return (
		<React.Fragment>
			{spaceship && (
				<Spaceship
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
