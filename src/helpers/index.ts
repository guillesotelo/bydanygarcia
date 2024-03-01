export const shuffleArray = (array: any[]) => {
    const newArr = [...array]
    let currentIndex = newArr.length, randomIndex
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [newArr[currentIndex], newArr[randomIndex]] = [newArr[randomIndex], newArr[currentIndex]]
    }
    return newArr
}

export const sortArray = (arr: any[], key: string | number, order?: boolean) => {
    return arr.slice().sort((a: any, b: any) => {
        const aValue = a[key]
        const bValue = b[key]
        if (typeof aValue !== 'number' && !aValue) return 1
        if (typeof bValue !== 'number' && !bValue) return -1
        return order ? aValue < bValue ? 1 : -1 : aValue < bValue ? -1 : 1
    })
}