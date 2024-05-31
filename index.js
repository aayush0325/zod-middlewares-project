const express = require("express");
const port = 3000;
const app = express();
const zod = require("zod"); 
app.use(express.json());
app.use((err,req,res,next) => {
    res.send('there is something wrong with your input please check')
})

const schema = zod.array(zod.number());


const anotherSchema = zod.object({
    email:zod.coerce.string().email(),
    password: zod.coerce.string().min(8),
    country: zod.literal("IN").or(zod.literal("US"))
});


app.listen(port,() => {
    console.log("listening to port 3000");
});

app.get('/', (req,res) => {
    res.json({
        msg:"welcome to the hospital",
        capacity:12354
    });
});

app.post('/',(req,res)=>{
    const kidneys = req.body.kidney;
    const response = schema.safeParse(kidneys);
    
    if(response.success){
        res.status(200).json({
            msg:"input recieved"
        });
    }else{
        res.status(422).json({
            msg:"invalid input"
        });
    }
});


app.post('/check', (req,res) => {
    const user = req.body;
    const response = anotherSchema.safeParse(user);

    if(response.success){
        res.status(200).send('valid input');
    }else{
        res.status(422).send('invalid input');
    }
});


