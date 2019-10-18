## Getting Started

In order to be able to automatically deploy the App to DXP you need to configure your DXP local installation path.

Replace `liferayDir` with yours in `.npmbuildrc`.
```
{
    "liferayDir": "/Users/carloslancha/Proyectos/liferay/devcon-2019/liferay-dxp-7.2.10.1-sp1"
}
```

### Data on DXP
Displayed data comes from Liferay DXP Structured Content, so you will need to configure your DXP and create some content.

#### Configure CORS

- Go to Configuration / System Settings / Security Tools / Portal CORS

- Add new URL Pattern with value `/o/graphql` and Save.

#### Import Structured Content

- Go to Content & Data / Web Content

- Go to Import / Export

- Import file `dxp/Web_Content.lar`

### Running the App

Run `yarn install`

Replace Liferay DXP user and password with yours in `src/constants.js``
```
const USER_DATA = {
    user: 'test@liferay.com',
    password: 'test'
};
```

Replace `SITE_ID` and `CONTENT_KEY` values with the ones from the content you want to get. This step is no needed after `Add Configuration`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
