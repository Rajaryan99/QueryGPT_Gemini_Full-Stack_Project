import express from 'express'
import Thread from '../models/Thread.js'
import getOpenAIAPIResponse from '../utils/openai.js'

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

router.get('/thread/:threadId', async(req, res) => {

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

router.delete('/thread/:threadId', async(req, res) => {
    const {threadId}   = req.params;
    try {

        const deletedChat = await Thread.findOneAndDelete({threadId});

        if(!deletedChat) {
            res.status(404).json({error: 'Chat Not Found'})
        }

        res.status(200).json({success: "Chat was deleted successfully!"})
        
    } catch (error) {
         console.log(error);
        res.status(500).json('Failed to delete')
    }
});


router.post('/chat', async (req, res) => {

    const {threadId, message} = req.body;

    if(!threadId || !message){
        res.status(400).json({error: "missiong required fields"})
    }
    try {

        let chat = await Thread.findOne({threadId});

        if(!chat){
            chat = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content: message}]
            })
        } else {
            chat.messages.push({role: "user", content: message})
        }

        const assistentReplay  = await getOpenAIAPIResponse(message);

        chat.messages.push({role: "assistant", content: assistentReplay});
        chat.updatedAt = new Date();

        await chat.save();

        res.json({replay: assistentReplay})


        
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "something went wrong"})
        
    }
})

router.get('/xx', async(req, res) => {
    const chat = await Thread.find({});
    res.send(chat);
})



export default router;