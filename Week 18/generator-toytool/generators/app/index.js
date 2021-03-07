var Generator = require("yeoman-generator");

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    async initPackage() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "your projectd name",
                default: this.appname,
            },
        ]);

        const pkgJson = {
            name: "vue-demo",
            version: "1.0.0",
            description: "",
            main: "index.js",
            scripts: {
                build: 'webpack',
                test: 'mocha --require @babel/register',
                coverage: 'nyc mocha --require @babel/register',
            },
            author: "",
            license: "ISC",
            devDependencies: {},
            dependencies: {},
        };

        this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
        this.npmInstall(["vue"], { "save-dev": false });
        this.npmInstall(
            [
                "webpack",
                "webpack-cli",
                "vue-loader",
                "vue-style-loader",
                "css-loader",
                "babel-loader",
                "@babel/core",
                "@babel/preset-env",
                "@babel/register",
                "babel-preset-env",
                "babel-plugin-istanbul",
                "vue-template-compiler",
                "copy-webpack-plugin",
                "mocha",
                "nyc",
                "@istanbuljs/nyc-config-babel",
                "axios"
            ],
            { "save-dev": true }
        );

        this.fs.copyTpl(
            this.templatePath("HelloWorld.vue"),
            this.destinationPath("src/HelloWorld.vue"),
            {}
        );

        this.fs.copyTpl(
            this.templatePath("webpack.config.js"),
            this.destinationPath("webpack.config.js")
        );

        this.fs.copyTpl(
            this.templatePath("main.js"),
            this.destinationPath("src/main.js")
        );

        this.fs.copyTpl(
            this.templatePath("sample-test.js"),
            this.destinationPath("test/sample-test.js"),
            {}
        );

        this.fs.copyTpl(
            this.templatePath(".nycrc"),
            this.destinationPath(".nycrc")
        );

        this.fs.copyTpl(
            this.templatePath(".babelrc"),
            this.destinationPath(".babelrc")
        );

        this.fs.copyTpl(
            this.templatePath("index.html"),
            this.destinationPath("src/index.html"),
            { titie: answers.name }
        );
    }
};
