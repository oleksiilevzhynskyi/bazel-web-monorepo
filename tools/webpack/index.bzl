load("@npm//webpack-cli:index.bzl", "webpack_cli")

def webpack_app(name, data, srcs, outs = ["dist"], webpack_config_path = "webpack.config.ts"):
    default_deps = [
        # ts node + utils
        "@npm//ts-node",
        "@npm//ts-loader",
        "@npm//typescript",
        # webpack deps
        "@npm//@types/webpack",
        "@npm//glob",
        "@npm//webpack-dev-server",
        "@npm//webpack-merge",
    ]

    webpack_cli(
        name = name,
        outs = outs,
        args = [
            "--progress",
            "--config",
            "$(rootpath {})".format(webpack_config_path),
            "--output-path", "$@",
        ],
        data = default_deps + data + srcs + [
            ":tsconfig.json",
            "//tools/webpack:tsconfig.webpack.json",
            "//tools:tsconfig.base.json"
        ],
        env = {
            "TS_NODE_PROJECT": "$(rootpath //tools/webpack:tsconfig.webpack.json)",
        }
    )
