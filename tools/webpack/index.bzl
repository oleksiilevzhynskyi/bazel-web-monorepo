load("@npm//webpack-cli:index.bzl", "webpack_cli")
load("@npm//webpack:index.bzl", "webpack")

def webpack_app(name, data, srcs, outs = ["dist"], webpack_config_path = "webpack.config.ts", webpack_serve_config_path = "webpack.config.dev.ts"):
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

    # Build with webpack cli and "prod" config
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

    # Webpack config done by example from official rules_nodejs repo
    # https://github.com/bazelbuild/rules_nodejs/pull/2431/files#diff-97b320d044b3a8ed1c11802bb7b194fc8f8914bae58473f8c5f51a4bd38af728R43
    webpack(
        name = "serve",
        args = [
            "serve",
            "--progress",
            "--config",
            "$(rootpath {})".format(webpack_serve_config_path),
            "--nobazel_node_patches",
        ],
        data = default_deps + data + srcs + [
            ":tsconfig.json",
            "//tools/webpack:tsconfig.webpack.json",
            "//tools:tsconfig.base.json"
        ],
        env = {
            # Explicitly specify TS_NODE_PROJECT to be able to use TS for webpack configs
            "TS_NODE_PROJECT": "$(rootpath //tools/webpack:tsconfig.webpack.json)",
        },
        tags = [
            # Keeps the server alive under ibazel
            "ibazel_notify_changes",
        ],
    )

