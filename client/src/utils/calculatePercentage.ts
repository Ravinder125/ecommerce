export const calculatePercentage = (grow: number, count: number) => {
    console.log(grow, count)
    return Math.round(grow * Number(count + "%"))
}