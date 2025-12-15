import express from 'express'
import Thread from '../models/Thread.js'

const router = express.Router();

router.post('/test', async(req, res) => {
    try {

        const thread = new Thread({
            threadId: "XXXX",
            title: "my test sample data 2"
        })

        const resopnse = await thread.save();
        console.log("Thread saved in database");
        res.send(resopnse)

        
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "failed to save data "})
    }
});


//get all threads

router.get('/thread', async (req, res) => {

    try {

        const threads = await Thread.find({}).sort({updatedAt: -1})
        res.json(threads)



        
    } catch (error) {
        console.error(error);
        res.status(500).json('Failed to fetch Thread')
    }
})

export default router;