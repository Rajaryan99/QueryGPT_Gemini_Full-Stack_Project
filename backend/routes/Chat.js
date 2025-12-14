import express from 'express'
import Thread from '../models/Thread.js'

const router = express.Router();

router.post('/test', async(req, res) => {
    try {

        const thread = new Thread({
            threadId: "xyzxxx",
            title: "my test sample data"
        })

        const resopnse = await thread.save();
        console.log("Thread saved in database");
        res.send(resopnse)

        
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "failed to save data "})
    }
})

export default router;