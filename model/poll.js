const { query } = require('../db')

const responses = require('../responses')

const pollModel = module.exports = {
    getPollById: pollId => new Promise(async (resolve, reject) => {

        try {

            const polls = await query(`SELECT *
                                       from poll
                                       WHERE id = ?`, [pollId])
            if (polls.length === 0) return reject(responses.notFound())

            const poll = polls[0]
            const options = await pollModel.getOptionsForPoll(pollId)
            const votes = await pollModel.getVotesForPoll(pollId)


            const fullPoll = {
                id: poll.id,
                question: poll.question,
                options: options,
                votes: votes
            }

            resolve(fullPoll)
        } catch (error) {
            reject(error)
        }
    }),

    getVotesForPoll: pollId => query(`SELECT * FROM vote WHERE pollId = ?`, [pollId]),

    getOptionsForPoll: pollId => query(`SELECT * FROM pollOption WHERE pollId = ?`, [pollId])
}