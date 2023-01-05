module.exports ={
name: "ready",
 async execute(client) 
{
    client.manager.init(client.user.id);
    console.log('Logged In  As', client.user.username)
    client.user.setStatus('dnd') // You Can Change Status To : dnd , idle , online
 }
}