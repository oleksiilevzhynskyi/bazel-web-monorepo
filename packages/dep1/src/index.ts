/**
 * Split array into two by condition.
 * Items that satisfies condition goes into the first array
 */
 export function partition<TU, T extends TU>(
    list: TU[],
    condition: (item: TU) => item is T
  ): [T[], Exclude<TU, T>[]]
  export function partition<T>(list: T[], condition: (item: T) => boolean): [T[], T[]]
  export function partition<TU, T extends TU>(
    list: TU[],
    condition: (item: TU) => item is T
  ): [T[], Exclude<TU, T>[]] {
    return list.reduce(
      (acc, item: TU) => {
        if (condition(item)) {
          acc[0].push(item)
        } else {
          acc[1].push(item as Exclude<TU, T>)
        }
        return acc
      },
      [[], []] as [T[], Exclude<TU, T>[]]
    )
  }