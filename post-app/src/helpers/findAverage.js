export default function findAverage(array) {
    return array.reduce((x,y) => x+y)/array.length
}