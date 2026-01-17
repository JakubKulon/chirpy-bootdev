export function chirpCensor(text: string): string {
    const bannedWords = ['kerfuffle', 'sharbert', 'fornax']

    const splittedText = text.split(' ')

    const cleanedTextArray = []

    for (let i = 0; i < splittedText.length; i++) {

        const word = splittedText[i]

        if (!bannedWords.includes(word.toLowerCase())) {

            cleanedTextArray.push(word)

        } else {

            cleanedTextArray.push("****")
        }
    }

    return cleanedTextArray.join(' ')
}