import request from "postman-request";
const geocode = (address, callback) => {
    const url = `https://geocode.xyz/${address}?json=1&auth=211104629057439124321x74574`;
    request({url:url, json:true}, (error, {body})=>{
        if(error){
            callback("Error in the code.", undefined)
        }else{
            callback(undefined, {
                longitude:body['longt'],
                latitude:body['latt'],
                location: body['standard']['city']
            })
        }
    })
}
export default geocode