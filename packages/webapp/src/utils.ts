import * as Utils from "@bazel-denali-repo/utils";

export const partitionBy2 = (list: number[]) => Utils.partition(list, (i) => i > 2)