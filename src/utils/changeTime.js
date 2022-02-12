export const changeTime = (oldTime) => {
    const day = oldTime.slice(0, 10).split('-')
    const newDay = day[0] + '年' + day[1] + '月' + day[2] + '日'
    const newMinute = oldTime.slice(11, 19)
    const newTime = newDay + ' ' + newMinute

    return newTime
}
