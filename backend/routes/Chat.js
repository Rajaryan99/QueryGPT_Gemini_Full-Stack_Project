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

router.get('/thread/threadId', async(req, res) => {

    const {threadId}   = req.params;
    try {

        const chat = await  Thread.findOne({threadId});

        if(!chat) {
            res.status(404).json({error: 'chat not found'})
        }
        res.json(chat.messages);
        
    } catch (error) {
        console.error(error);
        res.status(500).json('Failed to fetch Chat')
    }
})

router.delete('/thread/threadId', async(req, res) => {
    const {threadId}   = req.params;
    try {

        const deletedChat = await Thread.findOneAndDelete({threadId});

        if(!chat) {
            res.status(404).json({error: 'Chat could not be deleted...'})
        }
        res.status(200).json({success: "Chat was deleted successfully!"})
        
    } catch (error) {
         console.error(error);
        res.status(500).json('Failed to delete')
    }
})

export default router;