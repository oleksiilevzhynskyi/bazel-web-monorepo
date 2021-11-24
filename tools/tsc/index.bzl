load("@build_bazel_rules_nodejs//:index.bzl", "js_library")
load("@npm//@bazel/typescript:index.bzl", "ts_config", "ts_project")
load("@npm//@bazel/typescript/internal:ts_config.bzl", "write_tsconfig")

def tsc_package(name, package_name, tsconfig, out_dir, srcs, deps, ts_config_overrides):
    """Default values for ts_project"""

    # here we create a single tsconfig to extend: pkg:tsconfig -> tools:tsconfig.base
    ts_config(
        name = "%s_tsconfig" % name,
        src = tsconfig,
        deps = ["//tools:tsconfig.base.json"],
    )

    # here we create a custom, each per ts_project output target (cjs, esm, es2015) tsconfig
    # and extend it from (pkg:tsconfig -> tools:tsconfig.base) created previously.
    write_tsconfig(
        name = "_gen_tsconfig_%s" % name,
        config = {},
        files = srcs,
        extends = "%s_tsconfig" % name,
        out = "tsconfig_%s.json" % name,
    )

    # macros to build tsc project
    ts_project(
        name = name,
        tsconfig = "tsconfig_%s.json" % name,
        extends = "%s_tsconfig" % name,
        srcs = srcs,
        deps = deps + ["@npm//tslib"],
        out_dir = out_dir,
        root_dir = "src",
        composite = True,
        declaration = True,
        declaration_map = True,
        resolve_json_module = True,
        incremental = True,
        source_map = True,
        validate = False,
        ts_build_info_file = out_dir + "/tsconfig.tsbuildinfo"
    )


    # Make an internal npm package from the output
    # Could be referecend by //packages/<my_package> in deps for another package
    js_library(
        name = "%s_lib" % name,
        srcs = srcs,
        # Code that depends on this target can import from
        package_name = package_name,
        # The .js and .d.ts outputs from above will be part of the package
        deps = deps,
    )
