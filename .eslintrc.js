module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "ignorePatterns": ["src/js/shared"],
    "rules": {
        "no-console": "warn",
        "operator-assignment": "warn",
        "prefer-arrow-callback": "warn",
        "no-undef": "error",
        "prefer-const": "error",
    }
}
