const packageJSON = require('./package.json');
const shopName = packageJSON.name;
const shopPath = `./shops/${shopName}`;
const shopAssetsPath = `${shopPath}/assets`;

const commonConfig = {
    slug: `${shopName}`,
    version: '1.0.0',
    orientation: "portrait",
    icon: `${shopAssetsPath}/icon.png`,
    splash: {
        image: `${shopAssetsPath}/splash.png`,
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [`${shopAssetsPath}/*`, "assets/*"],
    runtimeVersion: {
        policy: "sdkVersion"
    },
    android: {
        adaptiveIcon: {
            foregroundImage: `${shopAssetsPath}/adaptive-icon.png`,
            backgroundColor: "#FFFFFF"
        },
        package: `com.vesilta.${shopName}`,
        versionCode: 1,
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: `com.vesilta.${shopName}`,
        buildNumber: '1',
    },
    web: {
        favicon: `${shopAssetsPath}/favicon.png`,
    }
};

export default ({ config }) => {
    const appJson = `./app.${shopName}.json`;
    return {
        expo: {
            ...require(appJson),
            ...commonConfig
        }
    };
};