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
